import crypto from 'node:crypto'

const csrfCookie = 'csrf_token'
const csrfHeader = 'x-csrf-token'

function readCookie(req, name) {
  const value = req.headers.cookie?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))
  return value ? decodeURIComponent(value.slice(name.length + 1)) : ''
}

export function csrfTokenEndpoint(req, res) {
  const token = readCookie(req, csrfCookie) || crypto.randomBytes(32).toString('hex')
  res.cookie(csrfCookie, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
  res.json({ token })
}

export function csrfProtection(req, res, next) {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return next()
  if (req.path === '/api/admin/login' || req.path === '/api/contact') return next()

  const cookieToken = readCookie(req, csrfCookie)
  const requestToken = req.get(csrfHeader)
  if (!cookieToken || !requestToken || cookieToken.length !== requestToken.length ||
      !crypto.timingSafeEqual(Buffer.from(cookieToken), Buffer.from(requestToken))) {
    return res.status(403).json({ success: false, message: 'Invalid CSRF token.' })
  }
  next()
}
