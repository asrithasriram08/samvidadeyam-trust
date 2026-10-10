import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import Database from 'better-sqlite3'
import { Pool } from 'pg'
import { createPasswordHash } from './auth.js'

const configuredDataDir = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(process.cwd(), 'data')
const dataDir = configuredDataDir
const uploadsDir = path.join(dataDir, 'uploads')
const usePostgres = Boolean(process.env.DATABASE_URL)
const pool = usePostgres
  ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined })
  : null

fs.mkdirSync(dataDir, { recursive: true })
fs.mkdirSync(uploadsDir, { recursive: true })

const sqlite = usePostgres ? null : new Database(path.join(dataDir, 'samvida.db'))
if (sqlite) {
  sqlite.pragma('journal_mode = WAL')
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, name TEXT NOT NULL DEFAULT 'Trustee', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, date TEXT NOT NULL, image TEXT DEFAULT '', published INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, date TEXT NOT NULL, time TEXT DEFAULT '', location TEXT DEFAULT '', image TEXT DEFAULT '', published INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS gallery (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, caption TEXT DEFAULT '', album TEXT NOT NULL DEFAULT 'General', image TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
  `)
}

async function runMigrations() {
  if (!pool) return
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query('CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())')
    const applied = new Set((await client.query('SELECT version FROM schema_migrations')).rows.map((row) => row.version))
    const migrationDir = path.join(process.cwd(), 'server', 'migrations')
    const files = (await fsPromises.readdir(migrationDir)).filter((file) => file.endsWith('.sql')).sort()
    for (const file of files) {
      if (applied.has(file)) continue
      await client.query(await fsPromises.readFile(path.join(migrationDir, file), 'utf8'))
      await client.query('INSERT INTO schema_migrations (version) VALUES ($1)', [file])
    }
    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

function sqliteRows(query, ...params) {
  return sqlite.prepare(query).all(...params)
}

export async function ensureDatabaseReady() {
  if (process.env.NODE_ENV === 'production' && !pool) {
    throw new Error('DATABASE_URL must be set in production.')
  }
  await runMigrations()
}

export async function ensureInitialAdmin() {
  if (pool) return
  if (process.env.NODE_ENV === 'production') return
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || (password ? createPasswordHash(password) : null)
  if (!username || !passwordHash) return
  sqlite.prepare(`
    INSERT INTO admins (username, password_hash, name) VALUES (?, ?, ?)
    ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash, name = excluded.name
  `).run(username, passwordHash, 'Trustee')
}

export async function getAdminByUsername(username) {
  if (pool) return (await pool.query('SELECT * FROM admins WHERE username = $1', [username])).rows[0]
  return sqlite.prepare('SELECT * FROM admins WHERE username = ?').get(username)
}

export async function listNews() {
  if (pool) return (await pool.query('SELECT * FROM news ORDER BY date DESC, id DESC')).rows
  return sqliteRows('SELECT * FROM news ORDER BY date DESC, id DESC')
}

export async function listEvents() {
  if (pool) return (await pool.query('SELECT * FROM events ORDER BY date DESC, id DESC')).rows
  return sqliteRows('SELECT * FROM events ORDER BY date DESC, id DESC')
}

export async function listGallery() {
  if (pool) return (await pool.query('SELECT * FROM gallery ORDER BY id DESC')).rows
  return sqliteRows('SELECT * FROM gallery ORDER BY id DESC')
}

export async function createNewsEntry(data) {
  if (pool) return (await pool.query(
    'INSERT INTO news (title, description, date, image, published) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [data.title, data.description, data.date, data.image || '', Boolean(data.published)],
  )).rows[0]
  const result = sqlite.prepare('INSERT INTO news (title, description, date, image, published) VALUES (?, ?, ?, ?, ?)').run(data.title, data.description, data.date, data.image || '', Number(data.published))
  return sqlite.prepare('SELECT * FROM news WHERE id = ?').get(result.lastInsertRowid)
}

export async function updateNewsEntry(id, data) {
  if (pool) return (await pool.query(
    'UPDATE news SET title = $1, description = $2, date = $3, image = $4, published = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
    [data.title, data.description, data.date, data.image || '', Boolean(data.published), id],
  )).rows[0]
  sqlite.prepare('UPDATE news SET title = ?, description = ?, date = ?, image = ?, published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(data.title, data.description, data.date, data.image || '', Number(data.published), id)
  return sqlite.prepare('SELECT * FROM news WHERE id = ?').get(id)
}

export async function deleteNewsEntry(id) {
  if (pool) return (await pool.query('DELETE FROM news WHERE id = $1', [id])).rowCount > 0
  return sqlite.prepare('DELETE FROM news WHERE id = ?').run(id).changes > 0
}

export async function createEventEntry(data) {
  if (pool) return (await pool.query(
    'INSERT INTO events (title, description, date, time, location, image, published) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [data.title, data.description, data.date, data.time || '', data.location || '', data.image || '', Boolean(data.published)],
  )).rows[0]
  const result = sqlite.prepare('INSERT INTO events (title, description, date, time, location, image, published) VALUES (?, ?, ?, ?, ?, ?, ?)').run(data.title, data.description, data.date, data.time || '', data.location || '', data.image || '', Number(data.published))
  return sqlite.prepare('SELECT * FROM events WHERE id = ?').get(result.lastInsertRowid)
}

export async function updateEventEntry(id, data) {
  if (pool) return (await pool.query(
    'UPDATE events SET title = $1, description = $2, date = $3, time = $4, location = $5, image = $6, published = $7, updated_at = NOW() WHERE id = $8 RETURNING *',
    [data.title, data.description, data.date, data.time || '', data.location || '', data.image || '', Boolean(data.published), id],
  )).rows[0]
  sqlite.prepare('UPDATE events SET title = ?, description = ?, date = ?, time = ?, location = ?, image = ?, published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(data.title, data.description, data.date, data.time || '', data.location || '', data.image || '', Number(data.published), id)
  return sqlite.prepare('SELECT * FROM events WHERE id = ?').get(id)
}

export async function deleteEventEntry(id) {
  if (pool) return (await pool.query('DELETE FROM events WHERE id = $1', [id])).rowCount > 0
  return sqlite.prepare('DELETE FROM events WHERE id = ?').run(id).changes > 0
}

export async function createGalleryEntry(data) {
  if (pool) return (await pool.query(
    'INSERT INTO gallery (title, caption, album, image) VALUES ($1, $2, $3, $4) RETURNING *',
    [data.title, data.caption || '', data.album || 'General', data.image],
  )).rows[0]
  const result = sqlite.prepare('INSERT INTO gallery (title, caption, album, image) VALUES (?, ?, ?, ?)').run(data.title, data.caption || '', data.album || 'General', data.image)
  return sqlite.prepare('SELECT * FROM gallery WHERE id = ?').get(result.lastInsertRowid)
}

export async function deleteGalleryEntry(id) {
  if (pool) return (await pool.query('DELETE FROM gallery WHERE id = $1', [id])).rowCount > 0
  return sqlite.prepare('DELETE FROM gallery WHERE id = ?').run(id).changes > 0
}

export async function getPublicContent() {
  const [news, events, gallery] = await Promise.all([listNews(), listEvents(), listGallery()])
  return {
    news: news.filter((item) => item.published === true || Number(item.published) === 1),
    events: events.filter((item) => item.published === true || Number(item.published) === 1),
    gallery,
  }
}

export { dataDir, uploadsDir, pool, usePostgres }
