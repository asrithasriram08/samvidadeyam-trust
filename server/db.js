import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'
import { createPasswordHash } from './auth.js'

const configuredDataDir = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(process.cwd(), 'data')
const dataDir = configuredDataDir
const uploadsDir = path.join(dataDir, 'uploads')

fs.mkdirSync(dataDir, { recursive: true })
fs.mkdirSync(uploadsDir, { recursive: true })

const db = new Database(path.join(dataDir, 'samvida.db'))
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT 'Trustee',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    image TEXT DEFAULT '',
    published INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT DEFAULT '',
    location TEXT DEFAULT '',
    image TEXT DEFAULT '',
    published INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    caption TEXT DEFAULT '',
    album TEXT NOT NULL DEFAULT 'General',
    image TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`)

export function ensureInitialAdmin() {
  const isProduction = process.env.NODE_ENV === 'production'
  const username = process.env.ADMIN_USERNAME || (isProduction ? null : 'trustee')
  const password = process.env.ADMIN_PASSWORD || (isProduction ? null : 'dev-admin-password')

  if (!username || !password) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in production.')
  }

  const passwordHash = process.env.ADMIN_PASSWORD_HASH || createPasswordHash(password)

  const existing = db.prepare('SELECT id FROM admins WHERE username = ?').get(username)

  if (existing) {
    db.prepare('UPDATE admins SET password_hash = ?, name = ? WHERE username = ?').run(passwordHash, 'Trustee', username)
    return
  }

  db.prepare('INSERT INTO admins (username, password_hash, name) VALUES (?, ?, ?)').run(username, passwordHash, 'Trustee')
}

export function getAdminByUsername(username) {
  return db.prepare('SELECT * FROM admins WHERE username = ?').get(username)
}

export function listNews() {
  return db.prepare('SELECT * FROM news ORDER BY date DESC, id DESC').all()
}

export function listEvents() {
  return db.prepare('SELECT * FROM events ORDER BY date DESC, id DESC').all()
}

export function listGallery() {
  return db.prepare('SELECT * FROM gallery ORDER BY id DESC').all()
}

export function createNewsEntry(data) {
  const result = db.prepare(`
    INSERT INTO news (title, description, date, image, published)
    VALUES (?, ?, ?, ?, ?)
  `).run(data.title, data.description, data.date, data.image || '', Number(data.published))

  return db.prepare('SELECT * FROM news WHERE id = ?').get(result.lastInsertRowid)
}

export function updateNewsEntry(id, data) {
  db.prepare(`
    UPDATE news
    SET title = ?, description = ?, date = ?, image = ?, published = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(data.title, data.description, data.date, data.image || '', Number(data.published), id)

  return db.prepare('SELECT * FROM news WHERE id = ?').get(id)
}

export function deleteNewsEntry(id) {
  const result = db.prepare('DELETE FROM news WHERE id = ?').run(id)
  return result.changes > 0
}

export function createEventEntry(data) {
  const result = db.prepare(`
    INSERT INTO events (title, description, date, time, location, image, published)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(data.title, data.description, data.date, data.time || '', data.location || '', data.image || '', Number(data.published))

  return db.prepare('SELECT * FROM events WHERE id = ?').get(result.lastInsertRowid)
}

export function updateEventEntry(id, data) {
  db.prepare(`
    UPDATE events
    SET title = ?, description = ?, date = ?, time = ?, location = ?, image = ?, published = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(data.title, data.description, data.date, data.time || '', data.location || '', data.image || '', Number(data.published), id)

  return db.prepare('SELECT * FROM events WHERE id = ?').get(id)
}

export function deleteEventEntry(id) {
  const result = db.prepare('DELETE FROM events WHERE id = ?').run(id)
  return result.changes > 0
}

export function createGalleryEntry(data) {
  const result = db.prepare(`
    INSERT INTO gallery (title, caption, album, image)
    VALUES (?, ?, ?, ?)
  `).run(data.title, data.caption || '', data.album || 'General', data.image)

  return db.prepare('SELECT * FROM gallery WHERE id = ?').get(result.lastInsertRowid)
}

export function deleteGalleryEntry(id) {
  const result = db.prepare('DELETE FROM gallery WHERE id = ?').run(id)
  return result.changes > 0
}

export function getPublicContent() {
  return {
    news: listNews().filter((item) => Number(item.published) === 1),
    events: listEvents().filter((item) => Number(item.published) === 1),
    gallery: listGallery(),
  }
}

export { db, dataDir, uploadsDir }
