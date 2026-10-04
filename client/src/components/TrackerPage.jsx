/**
 * TrackerPage
 * Shared page frame for Shipped, Golden Walnuts, Fish Caught and Bundles:
 * a page title above a translucent panel that holds the group cards.
 * (The big category icon at the top of the sidebar is set per route in
 * Layout.jsx.)
 *
 * Props:
 *   title: string
 *   children: the page content (usually a GroupedChecklist)
 */
export default function TrackerPage({ title, children }) {
  return (
    <div className="tracker-page">
      <h2 className="tracker-page__title">{title}</h2>
      <div className="tracker-page__panel">{children}</div>
    </div>
  )
}