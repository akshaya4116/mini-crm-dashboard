
import { createClient } from '@libsql/client'
import 'dotenv/config'

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error('Turso database credentials are missing. Check your .env file.')
}

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export async function initializeDatabase() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      business TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'New'
        CHECK(status IN ('New', 'Contacted', 'Converted')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  console.log('Turso database connected and initialized!')
}

export default db
