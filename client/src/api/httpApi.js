// The real backend. Talks to the Express API at VITE_API_BASE_URL.
//
// Same function names and return shapes as mockApi.js - components never know
// which one they're calling. See index.js for how the switch happens.

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`${response.status} ${response.statusText}: ${body}`)
  }
  // 204 No Content etc. have no body to parse
  if (response.status === 204) return null
  return response.json()
}

export async function listCategory(category) {
  return request(`/api/categories/${encodeURIComponent(category)}`)
}

export async function toggleItem(category, itemId) {
  return request(
    `/api/categories/${encodeURIComponent(category)}/items/${encodeURIComponent(itemId)}/toggle`,
    { method: 'PATCH' }
  )
}

export async function getSummary() {
  return request('/api/summary')
}