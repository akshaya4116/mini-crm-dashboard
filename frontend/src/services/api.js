
const API_URL = 'http://localhost:5000/api/leads'

export async function getLeads() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch leads')
  }

  return response.json()
}

export async function addLead(lead) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lead),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to add lead')
  }

  return data
}

export async function updateLead(id, lead) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lead),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update lead')
  }

  return data
}

export async function deleteLead(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete lead')
  }

  return data
}
