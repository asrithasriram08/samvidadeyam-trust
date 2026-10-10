import 'dotenv/config'
import Database from 'better-sqlite3'
import { Pool } from 'pg'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required. Refusing to import without explicit PostgreSQL configuration.')
}

const sqlitePath = process.env.SQLITE_IMPORT_PATH || 'data/samvida.db'
const sqlite = new Database(sqlitePath, { readonly: true, fileMustExist: true })
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined })
const client = await pool.connect()

try {
  await client.query('BEGIN')
  for (const row of sqlite.prepare('SELECT id, username, password_hash, name, created_at FROM admins').all()) {
    await client.query(
      `INSERT INTO admins (id, username, password_hash, name, created_at) VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (username) DO NOTHING`,
      [row.id, row.username, row.password_hash, row.name, row.created_at],
    )
  }
  for (const row of sqlite.prepare('SELECT id, title, description, date, image, published, created_at, updated_at FROM news').all()) {
    await client.query(
      `INSERT INTO news (id, title, description, date, image, published, created_at, updated_at)
       VALUES ($1, $2, $3, $4::date, $5, $6, $7, $8)
       ON CONFLICT (id) DO NOTHING`,
      [row.id, row.title, row.description, row.date, row.image || '', Boolean(row.published), row.created_at, row.updated_at],
    )
  }
  for (const row of sqlite.prepare('SELECT id, title, description, date, time, location, image, published, created_at, updated_at FROM events').all()) {
    await client.query(
      `INSERT INTO events (id, title, description, date, time, location, image, published, created_at, updated_at)
       VALUES ($1, $2, $3, $4::date, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO NOTHING`,
      [row.id, row.title, row.description, row.date, row.time || '', row.location || '', row.image || '', Boolean(row.published), row.created_at, row.updated_at],
    )
  }
  for (const row of sqlite.prepare('SELECT id, title, caption, album, image, created_at, updated_at FROM gallery').all()) {
    await client.query(
      `INSERT INTO gallery (id, title, caption, album, image, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO NOTHING`,
      [row.id, row.title, row.caption || '', row.album || 'General', row.image, row.created_at, row.updated_at],
    )
  }
  await client.query(`SELECT setval(pg_get_serial_sequence('admins', 'id'), COALESCE((SELECT MAX(id) FROM admins), 1), true)`)
  await client.query(`SELECT setval(pg_get_serial_sequence('news', 'id'), COALESCE((SELECT MAX(id) FROM news), 1), true)`)
  await client.query(`SELECT setval(pg_get_serial_sequence('events', 'id'), COALESCE((SELECT MAX(id) FROM events), 1), true)`)
  await client.query(`SELECT setval(pg_get_serial_sequence('gallery', 'id'), COALESCE((SELECT MAX(id) FROM gallery), 1), true)`)
  await client.query('COMMIT')
  console.log(`Imported SQLite records from ${sqlitePath}.`)
} catch (error) {
  await client.query('ROLLBACK')
  throw error
} finally {
  client.release()
  await pool.end()
  sqlite.close()
}
