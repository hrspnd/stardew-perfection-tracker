/**
 * ListTracker
 * Shared layout for: Produce/Forage Shipped, Golden Walnuts, Fish Caught,
 * Bundles, Cooking Recipes, Crafting Recipes.
 *
 * Renders a checklist as rows: [checkbox] [icon] [name] + N data columns.
 * Column count varies by page (e.g. Cooking/Crafting use 2 columns,
 * Shipped/Walnuts/Fish/Bundles use 3) — pass columns as a prop.
 *
 * Props:
 *   title: string
 *   items: Array<{ id, name, icon?, checked, columns?: string[] }>
 *   columnHeaders: string[]
 *   onToggle: (id) => void
 */

export default function ListTracker({ title, items, columnHeaders = [], onToggle }) {
  return (
    <section className="list-tracker">
      <header className="list-tracker__header">
        <h2>{title}</h2>
      </header>

      <div className="list-tracker__row list-tracker__row--headers">
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
        <div key={item.id} className="list-tracker__row">
          <input
            type="checkbox"
            checked={Boolean(item.checked)}
            onChange={() => onToggle(item.id)}
          />
          {item.icon ? (
            <img className="list-tracker__icon" src={item.icon} alt="" />
          ) : (
            <span className="list-tracker__icon list-tracker__icon--placeholder" />
          )}
          <span className="list-tracker__name">{item.name}</span>
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