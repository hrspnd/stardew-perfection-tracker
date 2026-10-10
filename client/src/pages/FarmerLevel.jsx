import { useEffect, useState } from 'react'
import { listCategory, toggleSkillLevel, setSkillProfession } from '../api'
import SkillTracker from '../components/SkillTracker'
import TrackerPage from '../components/TrackerPage'

// FarmerLevel (route: "/farmer-level")
// Uses SkillTracker. Pulls from the "farmerLevel" category, but toggling
// uses toggleSkillLevel/setSkillProfession instead of the generic toggleItem,
// since skills carry more structure than a flat checked/unchecked item.

export default function FarmerLevel() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)

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
    const before = skills.find((skill) => skill.id === skillId)?.[key]
    setActionError(null)

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
      setActionError(err.message)
      // Roll back on failure
      if (before) {
        setSkills((current) => current.map((s) => (s.id === skillId ? { ...s, [key]: before } : s)))
      }
    }
  }

  async function handleProfessionChange(skillId, tier, value) {
    const key = tier === 5 ? 'profession5' : 'profession10'
    const before = skills.find((skill) => skill.id === skillId)
    setActionError(null)

    setSkills((current) =>
      current.map((skill) => (skill.id === skillId ? { ...skill, [key]: value } : skill))
    )

    try {
      const updated = await setSkillProfession(skillId, tier, value)
      setSkills((current) => current.map((s) => (s.id === skillId ? updated : s)))
    } catch (err) {
      setActionError(err.message)
      // Roll back on failure (changing the level-5 pick also clears the level-10 pick)
      if (before) {
        setSkills((current) =>
          current.map((s) =>
            s.id === skillId
              ? { ...s, profession5: before.profession5, profession10: before.profession10 }
              : s
          )
        )
      }
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>

  return (
    <TrackerPage
      title="Farmer Skills"
      error={actionError}
      onDismissError={() => setActionError(null)}
    >
      <SkillTracker
        skills={skills}
        onToggleLevel={handleToggleLevel}
        onProfessionChange={handleProfessionChange}
      />
    </TrackerPage>
  )
}