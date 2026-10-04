import { useEffect, useState } from 'react'

/**
 * GroupedChecklist
 * Shared card layout for: Produce/Forage Shipped (groups = seasons/categories),
 * Golden Walnuts (groups = regions), Fish Caught (groups = where/when the fish
 * is caught) and Bundles (groups = individual bundles, WITH a reward line;
 * the Bundles page renders one of these per Room).
 *
 * Each group is a card: a coloured header (optional icon + title) and a
 * checklist (checkbox + optional icon + name). Clicking a name toggles it,
 * and checked rows fade. Cards are split into two balanced columns (one on
 * narrow screens): each card goes into whichever column is currently shorter,
 * so a few tall cards don't leave one side empty.
 *
 * Props:
 *   groups: Array<{
 *     id: string,
 *     title: string,
 *     icon?: string,
 *     items: Array<{ id, label, icon?, checked, details?: string[] }>,
 *     reward?: string,
 *     requiredCount?: number,  // e.g. "choose any 5 of 9" bundles
 *   }>
 *   onToggleItem: (groupId, itemId) => void
 *
 * `details` are small extra lines shown under an item's name (Fish uses them
 * for location, time and weather).
 */

const NARROW = '(max-width: 900px)'

// 1 column on narrow screens (cards stay in data order), otherwise 2.
function useColumnCount() {
  const [narrow, setNarrow] = useState(() => window.matchMedia(NARROW).matches)

  useEffect(() => {
    const query = window.matchMedia(NARROW)
    const update = () => setNarrow(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return narrow ? 1 : 2
}

// Rough card height in "rows": the header counts as 3, a row with detail
// lines is taller than a plain one, and the reward line is a little taller too.
function groupWeight(group) {
  const rows = group.items.reduce((sum, item) => sum + (item.details?.length ? 1.8 : 1), 0)
  return 3 + rows + (group.reward ? 1.5 : 0)
}

function splitIntoColumns(groups, count) {
  const columns = Array.from({ length: count }, () => ({ groups: [], weight: 0 }))
  for (const group of groups) {
    // On a tie the first (left) column wins.
    const shortest = columns.reduce((a, b) => (b.weight < a.weight ? b : a))
    shortest.groups.push(group)
    shortest.weight += groupWeight(group)
  }
  return columns.map((column) => column.groups)
}

export default function GroupedChecklist({ groups, onToggleItem }) {
  const columns = splitIntoColumns(groups, useColumnCount())

  return (
    <div className="grouped-checklist" style={{ '--columns': columns.length }}>
      {columns.map((columnGroups, columnIndex) => (
        <div key={columnIndex} className="grouped-checklist__column">
      {columnGroups.map((group) => (
        <section key={group.id} className="grouped-checklist__group">
          <header className="grouped-checklist__group-header">
            {group.icon && (
              <img className="grouped-checklist__group-icon" src={group.icon} alt="" />
            )}
            <h3>{group.title}</h3>
            {group.requiredCount ? (
              <span className="grouped-checklist__required-count">
                (need any {group.requiredCount} of {group.items.length})
              </span>
            ) : null}
          </header>

          <ul className="grouped-checklist__items">
            {group.items.map((item) => {
              const inputId = `${group.id}-${item.id}`
              return (
                <li
                  key={item.id}
                  className={
                    item.checked
                      ? 'grouped-checklist__item grouped-checklist__item--checked'
                      : 'grouped-checklist__item'
                  }
                >
                  <input
                    type="checkbox"
                    id={inputId}
                    checked={Boolean(item.checked)}
                    onChange={() => onToggleItem(group.id, item.id)}
                  />
                  {item.icon && (
                    <img className="grouped-checklist__icon" src={item.icon} alt="" />
                  )}
                  <label htmlFor={inputId} className="grouped-checklist__label">
                    <span className="grouped-checklist__name">{item.label}</span>
                    {item.details?.length > 0 && (
                      <span className="grouped-checklist__details">
                        {item.details.map((line, index) => (
                          <span key={index}>{line}</span>
                        ))}
                      </span>
                    )}
                  </label>
                </li>
              )
            })}

            {group.reward && (
              <li className="grouped-checklist__reward">Reward: {group.reward}</li>
            )}
          </ul>
        </section>
      ))}
        </div>
      ))}
    </div>
  )
}