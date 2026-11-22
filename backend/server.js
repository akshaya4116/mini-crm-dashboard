
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import leadsRouter from './routes/leads.js'
import { initializeDatabase } from './database/db.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Mini CRM API is running!' })
})

app.use('/api/leads', leadsRouter)

async function startServer() {
  try {
    await initializeDatabase()

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
