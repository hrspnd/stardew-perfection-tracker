import { useEffect, useState } from 'react'
import { getSummary } from '../api'
import DashboardSummaryCard from '../components/DashboardSummaryCard'

// Dashboard (route: "/")
// Landing page. Shows overall % perfection + one DashboardSummaryCard per
// tracked category, pulling totals from getSummary().
//
// Obelisks, Golden Clock, and Stardrops are three separate categories in
// the API (see seed.json) but live on one page (FarmProgress.jsx), so they
// get combined into a single "Farm Progress" card here.

const CARD_DEFS = [
  { key: 'shipped', label: 'Produce and Forage Shipped', href: '/shipped' },
  { key: 'walnuts', label: 'Golden Walnuts', href: '/golden-walnuts' },
  { key: 'fish', label: 'Fish Caught', href: '/fish' },
  { key: 'bundles', label: 'Bundles', href: '/bundles' },
  { key: 'cooking', label: 'Cooking Recipes', href: '/cooking' },
  { key: 'crafting', label: 'Crafting Recipes', href: '/crafting' },
  { key: 'farmProgress', label: 'Farm Progress', href: '/farm-progress' },
  { key: 'monsterSlayer', label: 'Monster Slayer', href: '/monster-slayer' },
  { key: 'museum', label: 'Museum', href: '/museum' },
  { key: 'greatFriends', label: 'Great Friends', href: '/great-friends' },
  { key: 'farmerLevel', label: 'Farmer Level', href: '/farmer-level' },
]

function percent(completed, total) {
  if (!total) return 0
  return Math.round((completed / total) * 100)
}

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    getSummary()
      .then((data) => {
        if (cancelled) return

        // Combine the 3 Farm Progress categories into one
        const farmProgress = ['obelisks', 'goldenClock', 'stardrops'].reduce(
          (acc, key) => {
            const entry = data[key] ?? { total: 0, completed: 0 }
            return {
              total: acc.total + entry.total,
              completed: acc.completed + entry.completed,
            }
          },
          { total: 0, completed: 0 }
        )

        setSummary({ ...data, farmProgress })
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (error) return <p>Something went wrong: {error}</p>
  if (!summary) return <p>Loading...</p>

  const overallTotal = CARD_DEFS.reduce((sum, def) => sum + (summary[def.key]?.total ?? 0), 0)
  const overallCompleted = CARD_DEFS.reduce(
    (sum, def) => sum + (summary[def.key]?.completed ?? 0),
    0
  )
  const overallPercent = percent(overallCompleted, overallTotal)

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard__total-perfection">
        <h3>Total Perfection</h3>
        <p className="dashboard__total-perfection-number">{overallPercent}%</p>
      </div>

      <div className="dashboard__grid">
        {CARD_DEFS.map((def) => {
          const entry = summary[def.key] ?? { total: 0, completed: 0 }
          return (
            <DashboardSummaryCard
              key={def.key}
              label={def.label}
              percent={percent(entry.completed, entry.total)}
              href={def.href}
            />
          )
        })}
      </div>
    </div>
  )
}