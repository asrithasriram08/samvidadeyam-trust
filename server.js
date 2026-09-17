import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { v2 as cloudinary } from 'cloudinary'
import { ensureInitialAdmin, getAdminByUsername, getPublicContent, listNews, listEvents, listGallery, createNewsEntry, updateNewsEntry, deleteNewsEntry, createEventEntry, updateEventEntry, deleteEventEntry, createGalleryEntry, deleteGalleryEntry, uploadsDir } from './server/db.js'
import { sanitizeText, validateNewsInput, validateEventInput, validateGalleryInput, verifyPassword } from './server/auth.js'

const app = express()
const PORT = Number(process.env.PORT || 3000)
const isProduction = process.env.NODE_ENV === 'production'
const SESSION_SECRET = process.env.SESSION_SECRET || (isProduction ? null : 'dev-session-secret-change-me')
const hasCloudinaryConfig = Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)

if (isProduction && !SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be set in production.')
}

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8,
    },
  }),
)

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

app.get('/api/content', (_req, res) => {
  try {
    res.json(getPublicContent())
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load public content.' })
  }
})

app.post('/api/admin/login', (req, res) => {
  const username = sanitizeText(req.body?.username || '', 80)
  const password = String(req.body?.password || '')

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' })
  }

  const admin = getAdminByUsername(username)
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

app.get('/api/admin/news', isAuthenticated, (_req, res) => {
  try {
    res.json({ success: true, items: listNews() })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load news items.' })
  }
})

app.post('/api/admin/news', isAuthenticated, requireBodyData, (req, res) => {
  const validation = validateNewsInput(req.body)
  if (!validation.ok) {
    return res.status(400).json({ success: false, message: validation.message })
  }

  try {
    const item = createNewsEntry(validation.data)
    return res.status(201).json({ success: true, item })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create news update.' })
  }
})

app.put('/api/admin/news/:id', isAuthenticated, requireBodyData, (req, res) => {
  const validation = validateNewsInput(req.body)
  if (!validation.ok) {
    return res.status(400).json({ success: false, message: validation.message })
  }

  try {
    const item = updateNewsEntry(Number(req.params.id), validation.data)
    return res.json({ success: true, item })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update news item.' })
  }
})

app.delete('/api/admin/news/:id', isAuthenticated, (req, res) => {
  try {
    const ok = deleteNewsEntry(Number(req.params.id))
    if (!ok) return res.status(404).json({ success: false, message: 'News item not found.' })
    res.json({ success: true, message: 'News item deleted.' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to delete news item.' })
  }
})

app.get('/api/admin/events', isAuthenticated, (_req, res) => {
  try {
    res.json({ success: true, items: listEvents() })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load events.' })
  }
})

app.post('/api/admin/events', isAuthenticated, requireBodyData, (req, res) => {
  const validation = validateEventInput(req.body)
  if (!validation.ok) {
    return res.status(400).json({ success: false, message: validation.message })
  }

  try {
    const item = createEventEntry(validation.data)
    return res.status(201).json({ success: true, item })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to create event.' })
  }
})

app.put('/api/admin/events/:id', isAuthenticated, requireBodyData, (req, res) => {
  const validation = validateEventInput(req.body)
  if (!validation.ok) {
    return res.status(400).json({ success: false, message: validation.message })
  }

  try {
    const item = updateEventEntry(Number(req.params.id), validation.data)
    return res.json({ success: true, item })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update event.' })
  }
})

app.delete('/api/admin/events/:id', isAuthenticated, (req, res) => {
  try {
    const ok = deleteEventEntry(Number(req.params.id))
    if (!ok) return res.status(404).json({ success: false, message: 'Event not found.' })
    res.json({ success: true, message: 'Event deleted.' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to delete event.' })
  }
})

app.get('/api/admin/gallery', isAuthenticated, (_req, res) => {
  try {
    res.json({ success: true, items: listGallery() })
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

    const item = createGalleryEntry(payload.data)
    return res.status(201).json({ success: true, item })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Photo upload failed. Please try again.' })
  }
})

app.delete('/api/admin/gallery/:id', isAuthenticated, async (req, res) => {
  try {
    const item = listGallery().find((entry) => Number(entry.id) === Number(req.params.id))
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

    const ok = deleteGalleryEntry(Number(req.params.id))
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

ensureInitialAdmin()

app.listen(PORT, () => {
  console.log(`Samvida Trust CMS running on http://localhost:${PORT}`)
})
