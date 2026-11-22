
import express from 'express'
import db from '../database/db.js'

const router = express.Router()

// GET: Fetch all leads
router.get('/', (req, res) => {
  try {
    const leads = db.prepare(
      'SELECT * FROM leads ORDER BY id DESC'
    ).all()

    res.json(leads)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leads' })
  }
})

// POST: Add a new lead
router.post('/', (req, res) => {
  try {
    const { name, email, phone, business, status = 'New' } = req.body

    if (!name || !email || !phone || !business) {
      return res.status(400).json({
        message: 'All fields are required'
      })
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!validEmail.test(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email address'
      })
    }

    if (!['New', 'Contacted', 'Converted'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid lead status'
      })
    }

    const result = db.prepare(`
      INSERT INTO leads (name, email, phone, business, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(name.trim(), email.trim(), phone.trim(), business.trim(), status)

    const newLead = db.prepare(
      'SELECT * FROM leads WHERE id = ?'
    ).get(result.lastInsertRowid)

    res.status(201).json(newLead)
  } catch (error) {
    res.status(500).json({ message: 'Failed to add lead' })
  }
})

// PUT: Update an existing lead
router.put('/:id', (req, res) => {
  try {
    const { name, email, phone, business, status } = req.body
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid lead ID' })
    }

    if (!name || !email || !phone || !business || !status) {
      return res.status(400).json({
        message: 'All fields are required'
      })
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!validEmail.test(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email address'
      })
    }

    if (!['New', 'Contacted', 'Converted'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid lead status'
      })
    }

    const result = db.prepare(`
      UPDATE leads
      SET name = ?, email = ?, phone = ?, business = ?, status = ?
      WHERE id = ?
    `).run(name.trim(), email.trim(), phone.trim(), business.trim(), status, id)

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Lead not found' })
    }

    const updatedLead = db.prepare(
      'SELECT * FROM leads WHERE id = ?'
    ).get(id)

    res.json(updatedLead)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update lead' })
  }
})

// DELETE: Remove a lead
router.delete('/:id', (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid lead ID' })
    }

    const result = db.prepare(
      'DELETE FROM leads WHERE id = ?'
    ).run(id)

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Lead not found' })
    }

    res.json({ message: 'Lead deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete lead' })
  }
})

export default router
