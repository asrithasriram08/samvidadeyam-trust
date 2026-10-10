import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { Pool } from 'pg'

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('DATABASE_URL is required. Refusing to run migrations without an explicit PostgreSQL database.')
}

const pool = new Pool({ connectionString: databaseUrl, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined })
const migrationsDir = path.join(process.cwd(), 'server', 'migrations')

const client = await pool.connect()
try {
  await client.query('BEGIN')
  await client.query('CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())')
  const applied = new Set((await client.query('SELECT version FROM schema_migrations')).rows.map((row) => row.version))
  const files = (await fs.readdir(migrationsDir)).filter((file) => file.endsWith('.sql')).sort()
  for (const file of files) {
    if (applied.has(file)) continue
    const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8')
    await client.query(sql)
    await client.query('INSERT INTO schema_migrations (version) VALUES ($1)', [file])
    console.log(`Applied migration ${file}`)
  }
  await client.query('COMMIT')
} catch (error) {
  await client.query('ROLLBACK')
  throw error
} finally {
  client.release()
  await pool.end()
}
