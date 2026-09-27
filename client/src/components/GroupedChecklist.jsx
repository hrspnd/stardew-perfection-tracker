/**
 * GroupedChecklist
 * Shared layout for: Produce/Forage Shipped (groups = seasons/categories,
 * no reward) and Bundles (groups = individual bundles, WITH a reward line;
 * the page wraps one of these per Room, e.g. "Crafts Room").
 *
 * Renders each group as a header + a plain checklist (checkbox + optional
 * icon + name, nothing else). If a group has a `reward`, it's shown as a
 * final non-checkbox row, visually distinct from the requirements above it.
 *
 * Props:
 *   groups: Array<{
 *     id: string,
 *     title: string,
 *     items: Array<{ id, label, icon?, checked }>,
 *     reward?: string,
 *     requiredCount?: number,  // e.g. "choose any 5 of 9" bundles
 *   }>
 *   onToggleItem: (groupId, itemId) => void
 */

export default function GroupedChecklist({ groups, onToggleItem }) {
  return (
    <div className="grouped-checklist">
      {groups.map((group) => (
        <section key={group.id} className="grouped-checklist__group">
          <header className="grouped-checklist__group-header">
            <h3>{group.title}</h3>
            {group.requiredCount && (
              <span className="grouped-checklist__required-count">
                (need any {group.requiredCount} of {group.items.length})
              </span>
            )}
          </header>

          <ul className="grouped-checklist__items">
            {group.items.map((item) => (
              <li key={item.id} className="grouped-checklist__item">
                <input
                  type="checkbox"
                  checked={Boolean(item.checked)}
                  onChange={() => onToggleItem(group.id, item.id)}
                />
                {item.icon ? (
                  <img className="grouped-checklist__icon" src={item.icon} alt="" />
                ) : (
                  <span className="grouped-checklist__icon grouped-checklist__icon--placeholder" />
                )}
                <span>{item.label}</span>
              </li>
            ))}

            {group.reward && (
              <li className="grouped-checklist__reward">Reward: {group.reward}</li>
            )}
          </ul>
        </section>
      ))}
    </div>
  )
}