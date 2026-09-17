import bcrypt from 'bcryptjs'

export function sanitizeText(value, maxLength = 2000) {
  if (value === null || value === undefined) return ''
  const normalized = String(value).replace(/\s+/g, ' ').trim()
  return normalized.slice(0, maxLength)
}

export function validateNewsInput(input = {}) {
  const title = sanitizeText(input.title, 200)
  const description = sanitizeText(input.description, 5000)
  const date = sanitizeText(input.date, 50)
  const image = sanitizeText(input.image, 500)

  if (!title) return { ok: false, message: 'News title is required.' }
  if (!description) return { ok: false, message: 'News description is required.' }
  if (!date) return { ok: false, message: 'News date is required.' }
  if (image && !/^https?:\/\/|^\/|^data:/.test(image)) {
    return { ok: false, message: 'Image must be a valid URL or local path.' }
  }

  return {
    ok: true,
    data: {
      title,
      description,
      date,
      image: image || '',
      published: Boolean(input.published),
    },
  }
}

export function validateEventInput(input = {}) {
  const title = sanitizeText(input.title, 200)
  const description = sanitizeText(input.description, 5000)
  const date = sanitizeText(input.date, 50)
  const time = sanitizeText(input.time, 50)
  const location = sanitizeText(input.location, 200)
  const image = sanitizeText(input.image, 500)

  if (!title) return { ok: false, message: 'Event title is required.' }
  if (!description) return { ok: false, message: 'Event description is required.' }
  if (!date) return { ok: false, message: 'Event date is required.' }
  if (image && !/^https?:\/\/|^\/|^data:/.test(image)) {
    return { ok: false, message: 'Event image must be a valid URL or local path.' }
  }

  return {
    ok: true,
    data: {
      title,
      description,
      date,
      time: time || '',
      location: location || '',
      image: image || '',
      published: Boolean(input.published),
    },
  }
}

export function validateGalleryInput(input = {}) {
  const title = sanitizeText(input.title, 200)
  const caption = sanitizeText(input.caption, 500)
  const album = sanitizeText(input.album, 120)
  const image = sanitizeText(input.image, 500)

  if (!title) return { ok: false, message: 'Photo title is required.' }
  if (!image) return { ok: false, message: 'Photo image is required.' }
  if (image && !/^https?:\/\/|^\/|^data:/.test(image)) {
    return { ok: false, message: 'Photo URL must be valid.' }
  }

  return {
    ok: true,
    data: {
      title,
      caption: caption || '',
      album: album || 'General',
      image,
    },
  }
}

export function verifyPassword(password, hash) {
  if (!password || !hash) return false
  return bcrypt.compareSync(password, hash)
}

export function createPasswordHash(password) {
  return bcrypt.hashSync(password, 10)
}
