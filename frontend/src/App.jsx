
import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCheck,
  Search,
  Bell,
  Plus,
  Pencil,
  Trash2,
  X,
  TrendingUp,
} from 'lucide-react'

import {
  getLeads,
  addLead,
  updateLead,
  deleteLead,
} from './services/api'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  business: '',
  status: 'New',
}

function App() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [activePage, setActivePage] = useState('Dashboard')

  // Fetch leads from backend
  useEffect(() => {
    async function fetchLeads() {
      try {
        const data = await getLeads()
        setLeads(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [])

  // Dashboard statistics
  const totalLeads = leads.length

  const newLeads = leads.filter(
    lead => lead.status === 'New'
  ).length

  const convertedLeads = leads.filter(
    lead => lead.status === 'Converted'
  ).length

  // Search and filter
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      filterStatus === 'All' || lead.status === filterStatus

    return matchesSearch && matchesStatus
  })

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  // Open Add Lead form
  function handleAddClick() {
    setEditingId(null)
    setFormData({ ...emptyForm })
    setError('')
    setShowForm(true)
  }

  // Open Edit Lead form
  function handleEditClick(lead) {
    setEditingId(lead.id)

    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      business: lead.business,
      status: lead.status,
    })

    setError('')
    setShowForm(true)
  }

  // Add or Update Lead
  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      if (editingId !== null) {
        const updatedLead = await updateLead(editingId, formData)

        setLeads(prev =>
          prev.map(lead =>
            lead.id === editingId ? updatedLead : lead
          )
        )
      } else {
        const newLead = await addLead(formData)

        setLeads(prev => [newLead, ...prev])
      }

      setFormData({ ...emptyForm })
      setEditingId(null)
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    }
  }

  // Delete Lead
  async function handleDelete(lead) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${lead.name}?`
    )

    if (!confirmed) return

    try {
      setError('')

      await deleteLead(lead.id)

      setLeads(prev =>
        prev.filter(item => item.id !== lead.id)
      )
    } catch (err) {
      setError(err.message)
    }
  }

  // Update lead status
  async function handleStatusChange(lead, newStatus) {
    try {
      setError('')

      const updatedLead = await updateLead(lead.id, {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        business: lead.business,
        status: newStatus,
      })

      setLeads(prev =>
        prev.map(item =>
          item.id === lead.id ? updatedLead : item
        )
      )
    } catch (err) {
      setError(err.message)
    }
  }

  // Navigation
  function handleNavigation(page) {
    setActivePage(page)
    setShowForm(false)
    setEditingId(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 md:flex">

      {/* Sidebar */}
      <aside className="w-full bg-slate-950 p-6 text-white md:min-h-screen md:w-64 md:shrink-0">

        <h1 className="mb-10 text-2xl font-bold">
          Mini<span className="text-blue-400">CRM</span>
        </h1>

        {/* Navigation */}
        <nav className="space-y-3">

          <button
            onClick={() => handleNavigation('Dashboard')}
            className={`flex w-full items-center gap-3 rounded-lg p-3 transition ${
              activePage === 'Dashboard'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() => handleNavigation('Leads')}
            className={`flex w-full items-center gap-3 rounded-lg p-3 transition ${
              activePage === 'Leads'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users size={20} />
            Leads
          </button>

        </nav>

        <p className="mt-12 text-xs text-slate-500">
          CRM MANAGEMENT
        </p>

      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-5 md:p-8">

        {/* Header */}
        <header className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              {activePage}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {activePage === 'Dashboard'
                ? "Welcome back! Here's your business overview."
                : 'Manage and track all your leads.'}
            </p>
          </div>

          <button
            type="button"
            className="rounded-full bg-white p-3 shadow-sm"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

        </header>

        {/* Dashboard Statistics */}
        {activePage === 'Dashboard' && (
          <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <StatCard
              title="Total Leads"
              value={totalLeads}
              icon={<Users />}
              color="bg-blue-100 text-blue-600"
            />

            <StatCard
              title="New Leads"
              value={newLeads}
              icon={<UserPlus />}
              color="bg-purple-100 text-purple-600"
            />

            <StatCard
              title="Converted"
              value={convertedLeads}
              icon={<UserCheck />}
              color="bg-green-100 text-green-600"
            />

          </section>
        )}

        {/* Add / Edit Form */}
        {showForm && (
          <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <h3 className="text-lg font-bold">
                {editingId !== null ? 'Edit Lead' : 'Add New Lead'}
              </h3>

              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setError('')
                }}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close form"
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-4 sm:grid-cols-2"
            >

              <input
                required
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="rounded-lg border p-3 outline-blue-500"
              />

              <input
                required
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="rounded-lg border p-3 outline-blue-500"
              />

              <input
                required
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-lg border p-3 outline-blue-500"
              />

              <input
                required
                name="business"
                placeholder="Business Name"
                value={formData.business}
                onChange={handleChange}
                className="rounded-lg border p-3 outline-blue-500"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded-lg border p-3 outline-blue-500"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
              </select>

              <div className="flex flex-wrap items-center gap-3">

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                >
                  {editingId !== null ? 'Update Lead' : 'Save Lead'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setError('')
                  }}
                  className="rounded-lg border px-5 py-3"
                >
                  Cancel
                </button>

              </div>

            </form>

            {error && (
              <p className="mt-4 text-sm text-red-500">
                {error}
              </p>
            )}

          </section>
        )}

        {/* Leads Management */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

            <div>
              <h3 className="text-lg font-bold">
                {activePage === 'Dashboard' ? 'Recent Leads' : 'All Leads'}
              </h3>

              <p className="text-sm text-slate-500">
                {activePage === 'Dashboard'
                  ? 'Manage and track your enquiries.'
                  : 'View, search, filter and manage all your leads.'}
              </p>
            </div>

            <button
              onClick={handleAddClick}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Lead
            </button>

          </div>

          {/* Search and Filter */}
          <div className="mb-5 flex flex-wrap gap-3">

            <div className="flex min-w-48 flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3">

              <Search size={18} className="text-slate-400" />

              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full py-2 outline-none"
              />

            </div>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="rounded-lg border border-slate-200 px-4 py-2"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
            </select>

          </div>

          {/* Error Message */}
          {!showForm && error && (
            <p className="mb-4 text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Loading and Leads Table */}
          {loading ? (

            <p className="py-10 text-center text-slate-500">
              Loading leads...
            </p>

          ) : filteredLeads.length === 0 ? (

            <p className="py-10 text-center text-slate-500">
              {leads.length === 0
                ? 'No leads found. Add your first lead!'
                : 'No matching leads found.'}
            </p>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead className="border-b bg-slate-50 text-slate-500">

                  <tr>
                    <th className="p-3">Lead Name</th>
                    <th className="p-3">Business</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredLeads.map(lead => (

                    <tr
                      key={lead.id}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >

                      <td className="p-3 font-medium">
                        {lead.name}
                      </td>

                      <td className="p-3">
                        {lead.business}
                      </td>

                      <td className="p-3 text-slate-500">
                        {lead.email}
                      </td>

                      <td className="p-3">
                        {lead.phone}
                      </td>

                      <td className="p-3">
                        <select
                          value={lead.status}
                          onChange={e =>
                            handleStatusChange(lead, e.target.value)
                          }
                          className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                            lead.status === 'Converted'
                              ? 'border-green-200 bg-green-50 text-green-700'
                              : lead.status === 'New'
                                ? 'border-blue-200 bg-blue-50 text-blue-700'
                                : 'border-amber-200 bg-amber-50 text-amber-700'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                        </select>
                      </td>

                      <td className="p-3">

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() => handleEditClick(lead)}
                            className="flex items-center gap-1 rounded-lg border border-blue-200 px-3 py-1 text-blue-600 hover:bg-blue-50"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(lead)}
                            className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  )
}

// Statistics Card Component
function StatCard({ title, value, icon, color }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center justify-between">

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <div className={`rounded-lg p-3 ${color}`}>
          {icon}
        </div>

      </div>

      <div className="flex items-center gap-2">

        <h3 className="text-3xl font-bold">
          {value}
        </h3>

        <span className="flex items-center text-xs text-green-600">
          <TrendingUp size={14} />
          Overview
        </span>

      </div>

    </div>
  )
}

export default App
