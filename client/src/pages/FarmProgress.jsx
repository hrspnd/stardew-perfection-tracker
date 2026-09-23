import { useEffect, useState } from 'react'
import { listCategory, toggleItem } from '../api'
import CardGridTracker from '../components/CardGridTracker'

// FarmProgress (route: "/farm-progress")
// One page, CardGridTracker with 3 cards: Obelisks, Golden Clock, Stardrops.
// Each card pulls from its own category in seed.json; each card's sub-items
// are that category's items.

const CARD_DEFS = [
  { id: 'obelisks', title: 'Obelisks', category: 'obelisks' },
  { id: 'goldenClock', title: 'Golden Clock', category: 'goldenClock' },
  { id: 'stardrops', title: 'Stardrops', category: 'stardrops' },
]

export default function FarmProgress() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    Promise.all(CARD_DEFS.map((def) => listCategory(def.category)))
      .then((results) => {
        if (cancelled) return
        const built = CARD_DEFS.map((def, index) => ({
          id: def.id,
          title: def.title,
          category: def.category,
          subItems: results[index].map((item) => ({
            id: item.id,
            label: item.name,
            checked: item.checked,
          })),
        }))
        setCards(built)
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

  async function handleToggleSubItem(cardId, subItemId) {
    const card = cards.find((c) => c.id === cardId)
    if (!card) return

    // Optimistic update
    setCards((current) =>
      current.map((c) =>
        c.id !== cardId
          ? c
          : {
              ...c,
              subItems: c.subItems.map((item) =>
                item.id === subItemId ? { ...item, checked: !item.checked } : item
              ),
            }
      )
    )

    try {
      await toggleItem(card.category, subItemId)
    } catch (err) {
      setError(err.message)
      // Roll back on failure
      setCards((current) =>
        current.map((c) =>
          c.id !== cardId
            ? c
            : {
                ...c,
                subItems: c.subItems.map((item) =>
                  item.id === subItemId ? { ...item, checked: !item.checked } : item
                ),
              }
        )
      )
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  return <CardGridTracker cards={cards} size="sm" onToggleSubItem={handleToggleSubItem} />
}