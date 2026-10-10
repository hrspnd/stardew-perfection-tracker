import { useEffect, useState } from 'react'
import { listCategory, toggleItem } from '../api'
import GroupedChecklist from '../components/GroupedChecklist'
import TrackerPage from '../components/TrackerPage'

// FishCaught (route: "/fish")
// Uses TrackerPage + GroupedChecklist. The fish data is one flat list
// (name + [season, location, time, weather]), so the page sorts it into cards:
// Year-Round, Seasonal, Night Market and Crab Pot. Each fish is in exactly one.

const CATEGORY = 'fish'

const GROUPS = [
  { id: 'year-round', title: 'Year-Round' },
  { id: 'seasonal', title: 'Seasonal' },
  { id: 'night-market', title: 'Night Market' },
  { id: 'crab-pot', title: 'Crab Pot' },
]

function groupIdFor(fish) {
  const season = fish.columns?.[0] ?? ''
  if (season.includes('Crab Pot')) return 'crab-pot'
  if (season.includes('Night Market')) return 'night-market'
  if (season.startsWith('Year-round')) return 'year-round'
  return 'seasonal'
}

function buildGroups(fish) {
  return GROUPS.map((group) => ({
    ...group,
    items: fish
      .filter((f) => groupIdFor(f) === group.id)
      .map((f) => {
        const [season, location, time, weather] = f.columns ?? []
        return {
          id: f.id,
          label: f.name,
          checked: f.checked,
          // Season is only worth showing on the Seasonal card; the others
          // already say it in their title.
          details: [
            group.id === 'seasonal' ? season : null,
            location,
            time,
            weather ? `${weather} weather` : null,
          ].filter(Boolean),
        }
      }),
  })).filter((group) => group.items.length > 0)
}

export default function FishCaught() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)

  useEffect(() => {
    let cancelled = false
    listCategory(CATEGORY)
      .then((data) => { if (!cancelled) setItems(data) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function handleToggle(itemId) {
    setActionError(null)
    setItems((current) =>
      current.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item))
    )
    try {
      const updated = await toggleItem(CATEGORY, itemId)
      setItems((current) => current.map((item) => (item.id === itemId ? updated : item)))
    } catch (err) {
      setActionError(err.message)
      setItems((current) =>
        current.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item))
      )
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  return (
    <TrackerPage
      title="Fish Caught"
      error={actionError}
      onDismissError={() => setActionError(null)}
    >
      <GroupedChecklist
        groups={buildGroups(items)}
        onToggleItem={(_groupId, itemId) => handleToggle(itemId)}
      />
    </TrackerPage>
  )
}