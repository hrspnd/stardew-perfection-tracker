import { useEffect, useState } from 'react'
import { listCategory, toggleItem } from '../api'
import ListTracker from '../components/ListTracker'
import TrackerPage from '../components/TrackerPage'

// Museum (route: "/museum")
// Uses TrackerPage + ListTracker, same layout as Cooking and Crafting.
// The data is one flat list of items with columns [type, where to find], so the
// page splits it into an Artifacts card and a Minerals card, each with its own
// "X of Y" count. (Anything with another type lands in an "Other" card.)

const CATEGORY = 'museum'

const TYPES = [
  { type: 'Artifact', title: 'Artifacts' },
  { type: 'Mineral', title: 'Minerals' },
]

function buildLists(items) {
  const known = TYPES.map(({ type }) => type)
  const lists = TYPES.map(({ type, title }) => ({
    id: type,
    title,
    items: items.filter((item) => item.columns?.[0] === type),
  }))
  const other = items.filter((item) => !known.includes(item.columns?.[0]))
  if (other.length > 0) lists.push({ id: 'other', title: 'Other', items: other })

  // The type is now the card's title, so each row only needs "where to find".
  return lists
    .filter((list) => list.items.length > 0)
    .map((list) => ({
      ...list,
      items: list.items.map((item) => ({ ...item, columns: item.columns?.slice(1) ?? [] })),
    }))
}

export default function Museum() {
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
      title="Museum Items Donated"
      error={actionError}
      onDismissError={() => setActionError(null)}
    >
      {buildLists(items).map((list) => (
        <ListTracker
          key={list.id}
          title={list.title}
          items={list.items}
          columnHeaders={['Where to find']}
          onToggle={handleToggle}
        />
      ))}
    </TrackerPage>
  )
}