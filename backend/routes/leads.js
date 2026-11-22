
import express from 'express'
import db from '../database/db.js'

const router = express.Router()

const validStatuses = ['New', 'Contacted', 'Converted']

// GET: Retrieve all leads
router.get('/', async (req, res) => {
  try {
    const result = await db.execute(
      'SELECT * FROM leads ORDER BY id DESC'
    )

    res.json(result.rows)
  } catch (error) {
    console.error('Fetch leads error:', error)
    res.status(500).json({ message: 'Failed to fetch leads' })
  }
})

// POST: Add a new lead
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, business, status = 'New' } = req.body

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !business?.trim()
    ) {
      return res.status(400).json({
        message: 'All fields are required',
      })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        message: 'Please enter a valid email address',
      })
    }

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid lead status',
      })
    }

    const result = await db.execute({
      sql: `
        INSERT INTO leads (name, email, phone, business, status)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [
        name.trim(),
        email.trim(),
        phone.trim(),
        business.trim(),
        status,
      ],
    })

    const newLead = await db.execute({
      sql: 'SELECT * FROM leads WHERE id = ?',
      args: [result.lastInsertRowid],
    })

    res.status(201).json(newLead.rows[0])
  } catch (error) {
    console.error('Add lead error:', error)
    res.status(500).json({ message: 'Failed to add lead' })
  }
})

// PUT: Update an existing lead
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { name, email, phone, business, status } = req.body

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid lead ID' })
    }

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !business?.trim()
    ) {
      return res.status(400).json({
        message: 'All fields are required',
      })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        message: 'Please enter a valid email address',
      })
    }

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid lead status',
      })
    }

    const result = await db.execute({
      sql: `
        UPDATE leads
        SET name = ?, email = ?, phone = ?, business = ?, status = ?
        WHERE id = ?
      `,
      args: [
        name.trim(),
        email.trim(),
        phone.trim(),
        business.trim(),
        status,
        id,
      ],
    })

    if (Number(result.rowsAffected) === 0) {
      return res.status(404).json({ message: 'Lead not found' })
    }

    const updatedLead = await db.execute({
      sql: 'SELECT * FROM leads WHERE id = ?',
      args: [id],
    })

    res.json(updatedLead.rows[0])
  } catch (error) {
    console.error('Update lead error:', error)
    res.status(500).json({ message: 'Failed to update lead' })
  }
})

// DELETE: Delete a lead
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid lead ID' })
    }

    const result = await db.execute({
      sql: 'DELETE FROM leads WHERE id = ?',
      args: [id],
    })

    if (Number(result.rowsAffected) === 0) {
      return res.status(404).json({ message: 'Lead not found' })
    }

    res.json({ message: 'Lead deleted successfully' })
  } catch (error) {
    console.error('Delete lead error:', error)
    res.status(500).json({ message: 'Failed to delete lead' })
  }
})

export default router
