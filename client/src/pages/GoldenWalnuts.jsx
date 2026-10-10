import { useEffect, useState } from 'react'
import { listCategory, toggleGroupedItem } from '../api'
import GroupedChecklist from '../components/GroupedChecklist'
import TrackerPage from '../components/TrackerPage'

// GoldenWalnuts (route: "/golden-walnuts")
// Uses TrackerPage + GroupedChecklist. Groups = regions (Island East/West/
// North/South, Volcano, Other). Each item is a walnut discovery, labeled with
// its type and how many walnuts it's worth when more than 1 (130 in total).

export default function GoldenWalnuts() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)

  useEffect(() => {
    let cancelled = false
    listCategory('walnuts')
      .then((data) => { if (!cancelled) setGroups(data) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function handleToggleItem(groupId, itemId) {
    setActionError(null)
    setGroups((current) =>
      current.map((group) =>
        group.id !== groupId
          ? group
          : {
              ...group,
              items: group.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
      )
    )

    try {
      await toggleGroupedItem('walnuts', groupId, itemId)
    } catch (err) {
      setActionError(err.message)
      setGroups((current) =>
        current.map((group) =>
          group.id !== groupId
            ? group
            : {
                ...group,
                items: group.items.map((item) =>
                  item.id === itemId ? { ...item, checked: !item.checked } : item
                ),
              }
        )
      )
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  return (
    <TrackerPage
      title="Golden Walnuts Found"
      error={actionError}
      onDismissError={() => setActionError(null)}
    >
      <GroupedChecklist groups={groups} onToggleItem={handleToggleItem} />
    </TrackerPage>
  )
}