import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import connectPgSimple from 'connect-pg-simple'
import multer from 'multer'
import nodemailer from 'nodemailer'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { v2 as cloudinary } from 'cloudinary'
import { ensureDatabaseReady, ensureInitialAdmin, getAdminByUsername, getPublicContent, listNews, listEvents, listGallery, createNewsEntry, updateNewsEntry, deleteNewsEntry, createEventEntry, updateEventEntry, deleteEventEntry, createGalleryEntry, deleteGalleryEntry, uploadsDir, pool, usePostgres } from './server/db.js'
import { sanitizeText, validateNewsInput, validateEventInput, validateGalleryInput, verifyPassword } from './server/auth.js'
import { csrfProtection, csrfTokenEndpoint } from './server/security.js'

const app = express()
const PORT = Number(process.env.PORT || 3000)
const isProduction = process.env.NODE_ENV === 'production'
const SESSION_SECRET = process.env.SESSION_SECRET || (isProduction ? null : 'dev-session-secret-change-me')
const hasCloudinaryConfig = Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
const contactRecipient = process.env.CONTACT_RECIPIENT || 'samvidadeyamtrust@gmail.com'
const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:3000,https://samvidadeyam.in').split(',').map((origin) => origin.trim()).filter(Boolean))
const PgSession = connectPgSimple(session)

if (isProduction && !SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be set in production.')
}

if (isProduction && !usePostgres) {
  throw new Error('DATABASE_URL must be configured in production.')
}

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true)
    return callback(new Error('Origin is not allowed.'))
  },
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

const sessionOptions = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 8,
  },
}
if (pool) {
  sessionOptions.store = new PgSession({ pool, createTableIfMissing: true })
}

app.use(
  session(sessionOptions),
)
app.get('/api/csrf-token', csrfTokenEndpoint)
app.use(csrfProtection)

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
})

const uploadDir = uploadsDir
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
    const unique = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}-${safe}`
    cb(null, unique)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image uploads are allowed.'))
      return
    }
    cb(null, true)
  },
})

function extractCloudinaryPublicId(imageUrl) {
  if (!imageUrl || !imageUrl.includes('res.cloudinary.com')) return null

  try {
    const url = new URL(imageUrl)
    const segments = url.pathname.split('/').filter(Boolean)
    const uploadIndex = segments.findIndex((segment) => segment === 'upload')
    if (uploadIndex === -1) return null

    const publicIdSegments = segments.slice(uploadIndex + 2)
    const publicId = publicIdSegments.join('/')
    return publicId.replace(/\.[^/.]+$/, '')
  } catch (_error) {
    return null
  }
}

async function uploadImageToCloudinary(filePath) {
  if (!hasCloudinaryConfig) {
    return null
  }

  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'samvida-gallery',
    resource_type: 'image',
  })

  return result.secure_url
}

function isAuthenticated(req, res, next) {
  if (req.session && req.session.admin) return next()
  return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' })
}

function requireBodyData(req, res, next) {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ success: false, message: 'Request body is required.' })
  }
  next()
}

app.use(express.static(path.join(process.cwd(), 'dist')))
app.get('/api/health', (_req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'development' }))

app.get('/api/content', async (_req, res) => {
  try {
    res.json(await getPublicContent())
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load public content.' })
  }
})

app.post('/api/contact', requireBodyData, async (req, res) => {
  const name = sanitizeText(req.body.name || '', 120)
  const email = sanitizeText(req.body.email || '', 254)
  const subject = sanitizeText(req.body.subject || '', 200)
  const message = sanitizeText(req.body.message || '', 5000)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(email)) {
    return res.status(400).json({ success: false, field: 'email', message: 'Invalid email.' })
  }
  if (!subject) {
    return res.status(400).json({ success: false, field: 'subject', message: 'Subject is empty.' })
  }
  if (!name || !message) {
    return res.status(400).json({ success: false, message: 'Name and message are required.' })
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return res.status(503).json({ success: false, message: 'Email service is not configured yet.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: contactRecipient,
      replyTo: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return res.json({ success: true })
  } catch (error) {
    console.error('Contact email failed:', error)
    return res.status(500).json({ success: false, message: 'Unable to send the message right now.' })
  }
})

app.post('/api/admin/login', loginLimiter, async (req, res) => {
  const username = sanitizeText(req.body?.username || '', 80)
  const password = String(req.body?.password || '')

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' })
  }

  const admin = await getAdminByUsername(username)
  if (!admin || !verifyPassword(password, admin.password_hash)) {
    return res.status(401).json({ success: false, message: 'Invalid username or password.' })
  }

  req.session.admin = {
    id: admin.id,
    username: admin.username,
    name: admin.name,
  }

  return res.json({ success: true, admin: { username: admin.username, name: admin.name } })
})

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.json({ success: true, message: 'Logged out successfully.' })
  })
})

app.get('/api/admin/session', (req, res) => {
  if (!req.session || !req.session.admin) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' })
  }

  return res.json({ success: true, admin: req.session.admin })
})

app.get('/api/admin/news', isAuthenticated, async (_req, res) => {
  try {
    res.json({ success: true, items: await listNews() })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load news items.' })
  }
})

app.post('/api/admin/news', isAuthenticated, requireBodyData, async (req, res) => {
  const validation = validateNewsInput(req.body)
  if (!validation.ok) {
    return res.status(400).json({ success: false, message: validation.message })
  }

  try {
    const item = await createNewsEntry(validation.data)
    return res.status(201).json({ success: true, item })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create news update.' })
  }
})

app.put('/api/admin/news/:id', isAuthenticated, requireBodyData, async (req, res) => {
  const validation = validateNewsInput(req.body)
  if (!validation.ok) {
    return res.status(400).json({ success: false, message: validation.message })
  }

  try {
    const item = await updateNewsEntry(Number(req.params.id), validation.data)
    return res.json({ success: true, item })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update news item.' })
  }
})

app.delete('/api/admin/news/:id', isAuthenticated, async (req, res) => {
  try {
    const ok = await deleteNewsEntry(Number(req.params.id))
    if (!ok) return res.status(404).json({ success: false, message: 'News item not found.' })
    res.json({ success: true, message: 'News item deleted.' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to delete news item.' })
  }
})

app.get('/api/admin/events', isAuthenticated, async (_req, res) => {
  try {
    res.json({ success: true, items: await listEvents() })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load events.' })
  }
})

app.post('/api/admin/events', isAuthenticated, requireBodyData, async (req, res) => {
  const validation = validateEventInput(req.body)
  if (!validation.ok) {
    return res.status(400).json({ success: false, message: validation.message })
  }

  try {
    const item = await createEventEntry(validation.data)
    return res.status(201).json({ success: true, item })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create event.' })
  }
})

app.put('/api/admin/events/:id', isAuthenticated, requireBodyData, async (req, res) => {
  const validation = validateEventInput(req.body)
  if (!validation.ok) {
    return res.status(400).json({ success: false, message: validation.message })
  }

  try {
    const item = await updateEventEntry(Number(req.params.id), validation.data)
    return res.json({ success: true, item })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update event.' })
  }
})

app.delete('/api/admin/events/:id', isAuthenticated, async (req, res) => {
  try {
    const ok = await deleteEventEntry(Number(req.params.id))
    if (!ok) return res.status(404).json({ success: false, message: 'Event not found.' })
    res.json({ success: true, message: 'Event deleted.' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to delete event.' })
  }
})

app.get('/api/admin/gallery', isAuthenticated, async (_req, res) => {
  try {
    res.json({ success: true, items: await listGallery() })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load gallery items.' })
  }
})

app.post('/api/admin/gallery/upload', isAuthenticated, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please choose an image to upload.' })
    }

    let imageUrl = `/uploads/${req.file.filename}`

    if (hasCloudinaryConfig) {
      const cloudinaryUrl = await uploadImageToCloudinary(req.file.path)
      if (cloudinaryUrl) {
        imageUrl = cloudinaryUrl
      }
      fs.unlinkSync(req.file.path)
    }

    const payload = validateGalleryInput({
      title: req.body.title || req.file.originalname,
      caption: req.body.caption || '',
      album: req.body.album || 'General',
      image: imageUrl,
    })

    if (!payload.ok) {
      return res.status(400).json({ success: false, message: payload.message })
    }

    const item = await createGalleryEntry(payload.data)
    return res.status(201).json({ success: true, item })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Photo upload failed. Please try again.' })
  }
})

app.delete('/api/admin/gallery/:id', isAuthenticated, async (req, res) => {
  try {
    const item = (await listGallery()).find((entry) => Number(entry.id) === Number(req.params.id))
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' })
    }

    if (item.image && item.image.includes('res.cloudinary.com')) {
      const publicId = extractCloudinaryPublicId(item.image)
      if (publicId) {
        await cloudinary.uploader.destroy(publicId)
      }
    } else if (item.image.startsWith('/uploads/')) {
      const localFile = path.join(process.cwd(), item.image.replace(/^\//, ''))
      if (fs.existsSync(localFile)) {
        fs.unlinkSync(localFile)
      }
    }

    const ok = await deleteGalleryEntry(Number(req.params.id))
    if (!ok) {
      return res.status(404).json({ success: false, message: 'Gallery item could not be removed.' })
    }
    res.json({ success: true, message: 'Photo deleted.' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to delete photo.' })
  }
})

app.use('/uploads', express.static(uploadDir))

app.get('/admin', (_req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'))
})

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'Endpoint not found.' })
  }

  if (req.path.startsWith('/admin')) {
    return res.sendFile(path.join(process.cwd(), 'dist', 'index.html'))
  }

  return res.sendFile(path.join(process.cwd(), 'dist', 'index.html'))
})

async function startServer() {
  await ensureDatabaseReady()
  await ensureInitialAdmin()
  app.listen(PORT, () => {
    console.log(`Samvida Trust CMS running on http://localhost:${PORT}`)
  })
}

if (process.env.NODE_ENV !== 'test') {
  startServer().catch((error) => {
    console.error('Unable to start server:', error.message)
    process.exitCode = 1
  })
}

export { app, startServer }
