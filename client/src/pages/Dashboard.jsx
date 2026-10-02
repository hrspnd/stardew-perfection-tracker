import { useEffect, useState } from 'react'
import { getSummary } from '../api'
import DashboardSummaryCard, { ProgressRing } from '../components/DashboardSummaryCard'

import cookingIcon from '../assets/icons/Cooking.png'
import craftingIcon from '../assets/icons/Crafting.png'
import farmerSkillsIcon from '../assets/icons/Farmer Skills.png'
import fishIcon from '../assets/icons/Fish Caught.png'
import walnutIcon from '../assets/icons/Golden Walnut.png'
import friendsIcon from '../assets/icons/Great Friends.png'
import monsterIcon from '../assets/icons/Monster Slayer.png'
import museumIcon from '../assets/icons/Museum.png'
import shippingIcon from '../assets/icons/Shipping.png'
import wizardIcon from '../assets/icons/Wizard.png'

// Dashboard (route: "/")
// Landing page. Total Perfection card + one DashboardSummaryCard per
// tracked category, pulling totals from getSummary().
//
// Obelisks, Golden Clock, and Stardrops are three separate categories in
// the API (see seed.json) but live on one page (FarmProgress.jsx), so they
// get combined into a single "Farm Progress" card here.
//
// Bundles has no icon yet - leave `icon` undefined and a placeholder shows.

const CARD_DEFS = [

  { key: 'shipped', label: 'Shipped Items', href: '/shipped', icon: shippingIcon,
    description: 'Track every item needed for the Full Shipment achievement.' },

  { key: 'walnuts', label: 'Golden Walnuts', href: '/golden-walnuts', icon: walnutIcon,
    description: 'Keep track of all 130 Golden Walnuts on Ginger Island.' },

  { key: 'fish', label: 'Fish Caught', href: '/fish', icon: fishIcon,
    description: 'Catch every fish, including legendary and special fish.' },

  { key: 'bundles', label: 'Bundles', href: '/bundles', icon: undefined,
    description: 'Complete all six rooms of the Community Center.' },

  { key: 'cooking', label: 'Cooking Recipes', href: '/cooking', icon: cookingIcon,
    description: 'Cook every recipe available in Stardew Valley.' },

  { key: 'crafting', label: 'Crafting Recipes', href: '/crafting', icon: craftingIcon,
    description: 'Craft every item needed for the Craft Master achievement.' },

  { key: 'farmProgress', label: 'Farm Progress', href: '/farm-progress', icon: wizardIcon,
    description: 'Track Obelisks, the Golden Clock, and Stardrops.' },

  { key: 'monsterSlayer', label: 'Monster Slayer', href: '/monster-slayer', icon: monsterIcon,
    description: 'Complete every Monster Eradication Goal in the Adventurer’s Guild.' },

  { key: 'museum', label: 'Museum', href: '/museum', icon: museumIcon,
    description: 'Donate every artifact and mineral to the Museum.' },

  { key: 'greatFriends', label: 'Great Friends', href: '/great-friends', icon: friendsIcon,
    description: 'Build full friendships with every villager.' },

  { key: 'farmerLevel', label: 'Farmer Level', href: '/farmer-level', icon: farmerSkillsIcon,
    description: 'Reach level 10 in Farming, Mining, Foraging, Fishing, and Combat.' },

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
      <h2 className="dashboard__title">Dashboard</h2>

      <div className="dashboard__panel">
        <div className="dashboard__grid">
          <section className="dashboard__total-perfection">
            <div className="dashboard__total-perfection-text">
              <h3>Total Perfection</h3>
              <p>
                {overallCompleted} of {overallTotal} tracked goals complete across{' '}
                {CARD_DEFS.length} categories.
              </p>
            </div>
            <ProgressRing
              percent={overallPercent}
              size={230}
              stroke={20}
              className="progress-ring--gold progress-ring--lg"
            />
          </section>

          {CARD_DEFS.map((def) => {
            const entry = summary[def.key] ?? { total: 0, completed: 0 }
            return (
              <DashboardSummaryCard
                key={def.key}
                label={def.label}
                description={def.description}
                icon={def.icon}
                percent={percent(entry.completed, entry.total)}
                href={def.href}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}