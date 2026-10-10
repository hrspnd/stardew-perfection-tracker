import { useEffect, useState } from 'react'
import { listCategory, toggleItem } from '../api'
import ListTracker from '../components/ListTracker'
import TrackerPage from '../components/TrackerPage'

// CraftingRecipes (route: "/crafting")
// Uses TrackerPage + ListTracker (2 data columns).

const CATEGORY = 'crafting'

export default function CraftingRecipes() {
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
      title="Crafting Recipes Made"
      error={actionError}
      onDismissError={() => setActionError(null)}
    >
      <ListTracker
        title="Recipes"
        items={items}
        columnHeaders={['Source', 'Materials']}
        onToggle={handleToggle}
      />
    </TrackerPage>
  )
}