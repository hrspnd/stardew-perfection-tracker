/**
 * FishCaught (route: "/fish")
 * Uses ListTracker. Data: all catchable fish, season/location/caught status.
 */

import { useEffect, useState } from 'react'
import { listCategory, toggleItem } from '../api'
import ListTracker from '../components/ListTracker'

// FishCaught (route: "/fish")
// Uses ListTracker. Same pattern as ProduceShipped.jsx.

const CATEGORY = 'fish'

export default function FishCaught() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    listCategory(CATEGORY)
      .then((data) => { if (!cancelled) setItems(data) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function handleToggle(itemId) {
    setItems((current) =>
      current.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item))
    )
    try {
      const updated = await toggleItem(CATEGORY, itemId)
      setItems((current) => current.map((item) => (item.id === itemId ? updated : item)))
    } catch (err) {
      setError(err.message)
      setItems((current) =>
        current.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item))
      )
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  return (
    <ListTracker
      title="Fish Caught"
      items={items}
      columnHeaders={['Season', 'Location', 'Time']}
      onToggle={handleToggle}
    />
  )
}