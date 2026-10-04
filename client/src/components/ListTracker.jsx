/**
 * ListTracker
 * Shared card layout for: Cooking Recipes and Crafting Recipes.
 *
 * One wide card: a coloured header (label + "X of Y" count), a row of column
 * headers, then one row per item: [checkbox] [icon?] [name] + N data columns.
 * Clicking a name toggles the checkbox, and checked rows fade. Icons are
 * optional - if no item has one, the icon column is left out.
 *
 * Props:
 *   title: string                  (card header label)
 *   items: Array<{ id, name, icon?, checked, columns?: string[] }>
 *   columnHeaders: string[]
 *   onToggle: (id) => void
 */

export default function ListTracker({ title, items, columnHeaders = [], onToggle }) {
  const rowStyle = { '--column-count': columnHeaders.length }
  const hasIcons = items.some((item) => item.icon)
  const doneCount = items.filter((item) => item.checked).length

  return (
    <section className={hasIcons ? 'list-tracker' : 'list-tracker list-tracker--no-icons'}>
      <header className="list-tracker__header">
        <h3>{title}</h3>
        <span className="list-tracker__count">
          {doneCount} of {items.length}
        </span>
      </header>

      <div className="list-tracker__body">
        <div className="list-tracker__row list-tracker__row--headers" style={rowStyle}>
          <span className="list-tracker__checkbox-spacer" />
          {hasIcons && <span className="list-tracker__icon-spacer" />}
          <span className="list-tracker__name-header" />
          {columnHeaders.map((header) => (
            <span key={header} className="list-tracker__column-header">
              {header}
            </span>
          ))}
        </div>

        {items.map((item) => {
          const inputId = `list-tracker-${item.id}`
          return (
            <div
              key={item.id}
              className={
                item.checked ? 'list-tracker__row list-tracker__row--checked' : 'list-tracker__row'
              }
              style={rowStyle}
            >
              <input
                type="checkbox"
                id={inputId}
                checked={Boolean(item.checked)}
                onChange={() => onToggle(item.id)}
              />
              {hasIcons &&
                (item.icon ? (
                  <img className="list-tracker__icon" src={item.icon} alt="" />
                ) : (
                  <span className="list-tracker__icon list-tracker__icon--placeholder" />
                ))}
              <label className="list-tracker__name" htmlFor={inputId}>
                {item.name}
              </label>
              {(item.columns ?? []).map((value, index) => (
                <span
                  key={index}
                  className="list-tracker__column"
                  data-label={columnHeaders[index]}
                >
                  {value}
                </span>
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}