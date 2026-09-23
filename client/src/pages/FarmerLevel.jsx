import { useEffect, useState } from 'react'
import { listCategory, toggleSkillLevel, setSkillProfession } from '../api'
import SkillTracker from '../components/SkillTracker'

// FarmerLevel (route: "/farmer-level")
// Uses SkillTracker. Pulls from the "farmerLevel" category, but toggling
// uses toggleSkillLevel/setSkillProfession instead of the generic toggleItem,
// since skills carry more structure than a flat checked/unchecked item.

export default function FarmerLevel() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    listCategory('farmerLevel')
      .then((data) => { if (!cancelled) setSkills(data) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function handleToggleLevel(skillId, tier, levelIndex) {
    const key = tier === 5 ? 'levels1to5' : 'levels6to10'

    // Optimistic update
    setSkills((current) =>
      current.map((skill) => {
        if (skill.id !== skillId) return skill
        const levels = [...skill[key]]
        levels[levelIndex] = !levels[levelIndex]
        return { ...skill, [key]: levels }
      })
    )

    try {
      const updated = await toggleSkillLevel(skillId, tier, levelIndex)
      setSkills((current) => current.map((s) => (s.id === skillId ? updated : s)))
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleProfessionChange(skillId, tier, value) {
    const key = tier === 5 ? 'profession5' : 'profession10'

    setSkills((current) =>
      current.map((skill) => (skill.id === skillId ? { ...skill, [key]: value } : skill))
    )

    try {
      const updated = await setSkillProfession(skillId, tier, value)
      setSkills((current) => current.map((s) => (s.id === skillId ? updated : s)))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  return (
    <SkillTracker
      skills={skills}
      onToggleLevel={handleToggleLevel}
      onProfessionChange={handleProfessionChange}
    />
  )
}