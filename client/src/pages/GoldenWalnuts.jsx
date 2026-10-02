import { useEffect, useState } from 'react'
import { listCategory, toggleGroupedItem } from '../api'
import GroupedChecklist from '../components/GroupedChecklist'

// GoldenWalnuts (route: "/golden-walnuts")
// Uses GroupedChecklist, same pattern as ProduceShipped. Groups = regions
// (Island East/West/North/South, Volcano, Other), each item is one of the
// 130 real walnut discoveries, labeled with its type and how many walnuts
// it's worth when more than 1.

export default function GoldenWalnuts() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    listCategory('walnuts')
      .then((data) => { if (!cancelled) setGroups(data) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function handleToggleItem(groupId, itemId) {
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
      setError(err.message)
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

  return <GroupedChecklist groups={groups} onToggleItem={handleToggleItem} />
}