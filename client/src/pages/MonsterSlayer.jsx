import { useEffect, useState } from 'react'
import { listCategory, toggleItem } from '../api'
import CardGridTracker from '../components/CardGridTracker'

// MonsterSlayer (route: "/monster-slayer")
// Uses CardGridTracker in leaf-card mode: one card per monster type.

const CATEGORY = 'monsterSlayer'

export default function MonsterSlayer() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    listCategory(CATEGORY)
      .then((data) => {
        if (cancelled) return
        setCards(
          data.map((item) => ({
            id: item.id,
            title: item.name,
            checked: item.checked,
            details: item.columns ?? [],
          }))
        )
      })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function handleToggleCard(cardId) {
    setCards((current) =>
      current.map((c) => (c.id === cardId ? { ...c, checked: !c.checked } : c))
    )
    try {
      await toggleItem(CATEGORY, cardId)
    } catch (err) {
      setError(err.message)
      setCards((current) =>
        current.map((c) => (c.id === cardId ? { ...c, checked: !c.checked } : c))
      )
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  return <CardGridTracker cards={cards} size="sm" onToggleCard={handleToggleCard} />
}