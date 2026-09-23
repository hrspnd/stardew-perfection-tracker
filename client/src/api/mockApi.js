// The simulated backend.
//
// Same function names, same return types, and the same shape of failure as
// httpApi.js, so your components cannot tell the difference. Data lives in the
// visitor's own browser and goes no further.
//
// This exists so the template's GitHub Pages link works on day one and so you
// can build the interface before your API is deployed. It is NOT a finished
// project.

import seed from './seed.json'

const KEY = 'stardew-tracker:progress'

// A real network is not instant. Keeping this delay is what forces you to build
// a loading state now, while it is cheap, instead of discovering you need one
// the day you switch to the real API.
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

function read() {
  const stored = localStorage.getItem(KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // Corrupted storage. Start again rather than crashing the app.
      localStorage.removeItem(KEY)
    }
  }
  localStorage.setItem(KEY, JSON.stringify(seed))
  return seed
}

function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
  return data
}

export async function listCategory(category) {
  await delay()
  const data = read()
  if (!(category in data)) throw new Error(`Unknown category: ${category}`)
  return data[category]
}

export async function toggleItem(category, itemId) {
  await delay()
  const data = read()
  const items = data[category] ?? []
  const index = items.findIndex((item) => String(item.id) === String(itemId))
  if (index === -1) throw new Error('Not found')
  items[index] = { ...items[index], checked: !items[index].checked }
  write(data)
  return items[index]
}

export async function getSummary() {
  await delay()
  const data = read()
  const summary = {}
  for (const [category, items] of Object.entries(data)) {
    summary[category] = {
      total: items.length,
      completed: items.filter((item) => item.checked).length,
    }
  }
  return summary
}