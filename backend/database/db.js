
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db = new Database(path.join(__dirname, 'crm.db'))

db.pragma('journal_mode = WAL')

db.exec(`
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

export default db
