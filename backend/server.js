
import express from 'express'
import cors from 'cors'
import leadsRouter from './routes/leads.js'

const app = express()
const PORT = 5000

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Mini CRM API is running!' })
})

app.use('/api/leads', leadsRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
