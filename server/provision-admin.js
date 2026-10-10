import 'dotenv/config'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { Pool } from 'pg'
import { createPasswordHash } from './auth.js'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required. Refusing to provision an admin without explicit PostgreSQL configuration.')
}

const args = new Map()
for (let index = 2; index < process.argv.length; index += 1) {
  const [key, value] = process.argv[index].split('=')
  if (key?.startsWith('--') && value) args.set(key.slice(2), value)
}

const rl = readline.createInterface({ input, output })
const username = args.get('username') || await rl.question('Admin username: ')
const password = args.get('password') || await rl.question('Admin password: ', { hideEchoBack: true })
const name = args.get('name') || await rl.question('Admin display name [Trustee]: ') || 'Trustee'
rl.close()

if (!username.trim() || password.length < 12) {
  throw new Error('Username is required and the password must be at least 12 characters.')
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined })
try {
  await pool.query(
    `INSERT INTO admins (username, password_hash, name) VALUES ($1, $2, $3)
     ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash, name = EXCLUDED.name`,
    [username.trim(), createPasswordHash(password), name.trim()],
  )
  console.log(`Provisioned admin ${username.trim()}.`)
} finally {
  await pool.end()
}
