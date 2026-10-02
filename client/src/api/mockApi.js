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

// Keys in seed.json that hold reference/metadata, not a trackable checklist -
// getSummary skips these since they have no total/completed to count.
const NON_TRACKABLE_CATEGORIES = ['greatFriendsUniversal', 'museumRewards']

export async function getSummary() {
  await delay()
  const data = read()
  const summary = {}
  for (const [category, items] of Object.entries(data)) {
    if (NON_TRACKABLE_CATEGORIES.includes(category)) {
      continue
    }
    if (category === 'shipped') {
      // Grouped shape: array of { items: [...] }
      const allItems = items.flatMap((group) => group.items)
      summary[category] = {
        total: allItems.length,
        completed: allItems.filter((item) => item.checked).length,
      }
    } else if (category === 'bundles') {
      // Nested shape: array of rooms > bundles > items
      const allItems = items.flatMap((room) => room.bundles.flatMap((bundle) => bundle.items))
      summary[category] = {
        total: allItems.length,
        completed: allItems.filter((item) => item.checked).length,
      }
    } else if (category === 'farmerLevel') {
      // Skills don't have a flat `checked` field - progress here means
      // how many of the 10 levels (5 + 5) are checked, summed across skills.
      const totalLevels = items.length * 10
      const completedLevels = items.reduce(
        (sum, skill) =>
          sum +
          skill.levels1to5.filter(Boolean).length +
          skill.levels6to10.filter(Boolean).length,
        0
      )
      summary[category] = { total: totalLevels, completed: completedLevels }
    } else {
      summary[category] = {
        total: items.length,
        completed: items.filter((item) => item.checked).length,
      }
    }
  }
  return summary
}

// --- Shipped only (for now): groups of items, each group has its own
// checklist. category is always 'shipped' currently, but this is written
// generically in case another category adopts the same grouped shape later.

export async function toggleGroupedItem(category, groupId, itemId) {
  await delay()
  const data = read()
  const groups = data[category] ?? []
  const group = groups.find((g) => g.id === groupId)
  if (!group) throw new Error('Group not found')
  const item = group.items.find((i) => i.id === itemId)
  if (!item) throw new Error('Item not found')
  item.checked = !item.checked
  write(data)
  return item
}

// --- Bundles only: nested one level deeper than groupedItem (Room > Bundle
// > Item), so it gets its own function rather than forcing a 3-arg category
// function to also carry a room id.

export async function toggleBundleItem(roomId, bundleId, itemId) {
  await delay()
  const data = read()
  const rooms = data.bundles ?? []
  const room = rooms.find((r) => r.id === roomId)
  if (!room) throw new Error('Room not found')
  const bundle = room.bundles.find((b) => b.id === bundleId)
  if (!bundle) throw new Error('Bundle not found')
  const item = bundle.items.find((i) => i.id === itemId)
  if (!item) throw new Error('Item not found')
  item.checked = !item.checked
  write(data)
  return item
}

// --- Farmer Level only: skills don't fit the flat checked/unchecked shape,
// so they get their own two functions instead of listCategory/toggleItem.

export async function toggleSkillLevel(skillId, tier, levelIndex) {
  await delay()
  const data = read()
  const skills = data.farmerLevel ?? []
  const index = skills.findIndex((s) => s.id === skillId)
  if (index === -1) throw new Error('Not found')

  const key = tier === 5 ? 'levels1to5' : 'levels6to10'
  const levels = [...skills[index][key]]
  levels[levelIndex] = !levels[levelIndex]
  skills[index] = { ...skills[index], [key]: levels }
  write(data)
  return skills[index]
}

export async function setSkillProfession(skillId, tier, value) {
  await delay()
  const data = read()
  const skills = data.farmerLevel ?? []
  const index = skills.findIndex((s) => s.id === skillId)
  if (index === -1) throw new Error('Not found')

  if (tier === 5) {
    const changed = skills[index].profession5 !== value
    skills[index] = {
      ...skills[index],
      profession5: value,
      // Level-10 options depend on the level-5 pick, so a changed pick
      // invalidates whatever level-10 profession was previously chosen.
      profession10: changed ? null : skills[index].profession10,
    }
  } else {
    skills[index] = { ...skills[index], profession10: value }
  }

  write(data)
  return skills[index]
}