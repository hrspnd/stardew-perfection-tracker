import { useEffect, useState } from 'react'
import { listCategory, toggleBundleItem } from '../api'
import GroupedChecklist from '../components/GroupedChecklist'

// Bundles (route: "/bundles")
// Data is Room > Bundle > Item. Renders one GroupedChecklist per Room,
// where each "group" passed to GroupedChecklist is actually one Bundle
// (name = bundle name, items = required items, reward shown at the bottom).

export default function Bundles() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    listCategory('bundles')
      .then((data) => { if (!cancelled) setRooms(data) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function handleToggleItem(roomId, bundleId, itemId) {
    setRooms((current) =>
      current.map((room) =>
        room.id !== roomId
          ? room
          : {
              ...room,
              bundles: room.bundles.map((bundle) =>
                bundle.id !== bundleId
                  ? bundle
                  : {
                      ...bundle,
                      items: bundle.items.map((item) =>
                        item.id === itemId ? { ...item, checked: !item.checked } : item
                      ),
                    }
              ),
            }
      )
    )

    try {
      await toggleBundleItem(roomId, bundleId, itemId)
    } catch (err) {
      setError(err.message)
      // Roll back on failure (re-toggle)
      setRooms((current) =>
        current.map((room) =>
          room.id !== roomId
            ? room
            : {
                ...room,
                bundles: room.bundles.map((bundle) =>
                  bundle.id !== bundleId
                    ? bundle
                    : {
                        ...bundle,
                        items: bundle.items.map((item) =>
                          item.id === itemId ? { ...item, checked: !item.checked } : item
                        ),
                      }
                ),
              }
        )
      )
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  return (
    <div className="bundles-page">
      {rooms.map((room) => (
        <section key={room.id} className="bundles-page__room">
          <h2>
            {room.name}
            {room.roomReward && (
              <span className="bundles-page__room-reward"> - Room reward: {room.roomReward}</span>
            )}
          </h2>
          <GroupedChecklist
            groups={room.bundles.map((bundle) => ({
              id: bundle.id,
              title: bundle.name,
              items: bundle.items,
              reward: bundle.reward,
              requiredCount: bundle.requiredCount,
            }))}
            onToggleItem={(bundleId, itemId) => handleToggleItem(room.id, bundleId, itemId)}
          />
        </section>
      ))}
    </div>
  )
}