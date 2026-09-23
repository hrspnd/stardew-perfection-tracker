import { NavLink } from 'react-router-dom'

/**
 * Layout
 * Shared page wrapper: top nav (dashboard/wiki/about + user icon)
 * and left sidebar nav. Wraps every page so nav doesn't get duplicated
 * per page. See App.jsx for how routes map to sidebar items.
 */

const SIDEBAR_LINKS = [
  { to: '/shipped', label: 'Shipping' },
  { to: '/great-friends', label: 'Great Friends' },
  { to: '/farmer-level', label: 'Farmer Skills' },
  { to: '/monster-slayer', label: 'Monster Slayer' },
  { to: '/cooking', label: 'Cooking' },
  { to: '/crafting', label: 'Crafting' },
  { to: '/fish', label: 'Fish Caught' },
  { to: '/farm-progress', label: 'Farm Progress' },
  { to: '/golden-walnuts', label: 'Golden Walnuts' },
  { to: '/museum', label: 'Museum' },
  { to: '/bundles', label: 'Bundles' },
]

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout__topnav">
        <NavLink to="/" className="layout__logo">
          Stardew Valley Perfection Tracker
        </NavLink>
        <nav className="layout__topnav-links">
          <NavLink to="/">Dashboard</NavLink>
          {/* TODO: replace with real wiki/about destinations, or drop these
              if the project doesn't need them */}
          <span>Wiki</span>
          <span>About</span>
        </nav>
        <div className="layout__user">{/* TODO: user icon / account */}</div>
      </header>

      <div className="layout__body">
        <aside className="layout__sidebar">
          {SIDEBAR_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'layout__sidebar-link layout__sidebar-link--active' : 'layout__sidebar-link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </aside>

        <main className="layout__content">{children}</main>
      </div>
    </div>
  )
}