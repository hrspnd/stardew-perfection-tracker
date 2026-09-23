import { useEffect, useState } from 'react'
import { listCategory, toggleItem } from '../api'
import ListTracker from '../components/ListTracker'

// ProduceShipped (route: "/shipped")
// Uses ListTracker. Pulls the "shipped" category from the API (mock or real,
// chosen automatically by src/api/index.js) and lets the user check items off.

export default function ProduceShipped() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    listCategory('shipped')
      .then((data) => {
        if (!cancelled) setItems(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function handleToggle(itemId) {
    // Optimistic update so the checkbox feels instant, then reconcile with
    // whatever the API actually saved.
    setItems((current) =>
      current.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    )
    try {
      const updated = await toggleItem('shipped', itemId)
      setItems((current) =>
        current.map((item) => (item.id === itemId ? updated : item))
      )
    } catch (err) {
      setError(err.message)
      // Roll back on failure
      setItems((current) =>
        current.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      )
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  return (
    <ListTracker
      title="Produce and Forage Shipped"
      items={items}
      columnHeaders={['Season', 'Base Price', 'Shipped Qty']}
      onToggle={handleToggle}
    />
  )
}