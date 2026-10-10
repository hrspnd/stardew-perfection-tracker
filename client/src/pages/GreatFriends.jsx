import { useEffect, useState } from 'react'
import { listCategory, toggleItem } from '../api'
import CardGridTracker from '../components/CardGridTracker'
import TrackerPage from '../components/TrackerPage'

// GreatFriends (route: "/great-friends")
// Uses CardGridTracker in leaf-card mode: one card per villager.
//
// Universal loves/likes (things most villagers like regardless of their
// individual preferences) are shown ONCE above the grid, not duplicated
// into every villager's card - see greatFriendsUniversal in seed.json.

const CATEGORY = 'greatFriends'

export default function GreatFriends() {
  const [cards, setCards] = useState([])
  const [universal, setUniversal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([listCategory(CATEGORY), listCategory('greatFriendsUniversal')])
      .then(([villagers, universalData]) => {
        if (cancelled) return
        setCards(
          villagers.map((item) => ({
            id: item.id,
            title: item.name,
            checked: item.checked,
            details: item.columns ?? [],
          }))
        )
        setUniversal(universalData)
      })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function handleToggleCard(cardId) {
    setActionError(null)
    setCards((current) =>
      current.map((c) => (c.id === cardId ? { ...c, checked: !c.checked } : c))
    )
    try {
      await toggleItem(CATEGORY, cardId)
    } catch (err) {
      setActionError(err.message)
      setCards((current) =>
        current.map((c) => (c.id === cardId ? { ...c, checked: !c.checked } : c))
      )
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  return (
    <TrackerPage
      title="Great Friends"
      error={actionError}
      onDismissError={() => setActionError(null)}
    >
    <div className="great-friends-page">
      {universal && (
        <section className="great-friends-page__universal">
          <h2>Universal Loves and Likes</h2>
          <p>Applies to every villager unless noted as an exception below.</p>

          <h3>Loves</h3>
          <ul>
            {universal.loves.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>

          <h3>Likes</h3>
          <ul>
            {universal.likes.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>
      )}

      <CardGridTracker cards={cards} size="sm" onToggleCard={handleToggleCard} />
    </div>
    </TrackerPage>
  )
}