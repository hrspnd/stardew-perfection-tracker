/**
 * ListTracker
 * Shared layout for: Fish Caught, Cooking Recipes, Crafting Recipes.
 *
 * Renders a checklist as rows: [checkbox] [icon] [name] + N data columns.
 * Column count varies by page (Cooking/Crafting use 2, Fish uses 4) -
 * pass columnHeaders as a prop. Clicking the name toggles the checkbox.
 *
 * Props:
 *   title: string
 *   items: Array<{ id, name, icon?, checked, columns?: string[] }>
 *   columnHeaders: string[]
 *   onToggle: (id) => void
 */

export default function ListTracker({ title, items, columnHeaders = [], onToggle }) {
  const rowStyle = { '--column-count': columnHeaders.length }

  return (
    <section className="list-tracker">
      <header className="list-tracker__header">
        <h2>{title}</h2>
      </header>

      <div className="list-tracker__row list-tracker__row--headers" style={rowStyle}>
        <span className="list-tracker__checkbox-spacer" />
        <span className="list-tracker__icon-spacer" />
        <span className="list-tracker__name-header">Name</span>
        {columnHeaders.map((header) => (
          <span key={header} className="list-tracker__column-header">
            {header}
          </span>
        ))}
      </div>

      {items.map((item) => (
        <div key={item.id} className="list-tracker__row" style={rowStyle}>
          <input
            type="checkbox"
            id={`list-tracker-${item.id}`}
            checked={Boolean(item.checked)}
            onChange={() => onToggle(item.id)}
          />
          {item.icon ? (
            <img className="list-tracker__icon" src={item.icon} alt="" />
          ) : (
            <span className="list-tracker__icon list-tracker__icon--placeholder" />
          )}
          <label className="list-tracker__name" htmlFor={`list-tracker-${item.id}`}>
            {item.name}
          </label>
          {(item.columns ?? []).map((value, index) => (
            <span key={index} className="list-tracker__column">
              {value}
            </span>
          ))}
        </div>
      ))}
    </section>
  )
}