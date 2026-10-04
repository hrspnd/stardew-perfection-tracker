import { NavLink, useLocation } from 'react-router-dom'

import chickenIcon from '../assets/stardew-chicken.png'
import bundlesIcon from '../assets/icons/Bundles.png'
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

/**
 * Layout
 * Shared page wrapper: sticky top nav (logo, dashboard/wiki/about, user icon)
 * and a sticky left sidebar. Only .layout__content scrolls.
 * See App.jsx for how routes map to sidebar items.
 *
 * Art slots: drop your logo into .layout__logo-img and the chicken sprite into
 * .layout__mascot (see the comments below) when you have the files. Pages with
 * an entry in PAGE_ICONS show their own big icon at the top of the sidebar.
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

// Big icon at the top of the sidebar, chosen by route. Routes not listed here
// (the dashboard, Bundles until it has an icon) show the empty mascot slot.
const PAGE_ICONS = {
  '/': chickenIcon,
  '/shipped': shippingIcon,
  '/golden-walnuts': walnutIcon,
  '/fish': fishIcon,
  '/bundles': bundlesIcon,
  '/great-friends': friendsIcon,
  '/farmer-level': farmerSkillsIcon,
  '/monster-slayer': monsterIcon,
  '/cooking': cookingIcon,
  '/crafting': craftingIcon,
  '/farm-progress': wizardIcon,
  '/museum': museumIcon,
}

const pillClass = ({ isActive }) =>
  isActive ? 'layout__pill layout__pill--active' : 'layout__pill'

export default function Layout({ children }) {
  const { pathname } = useLocation()
  const pageIcon = PAGE_ICONS[pathname]

  return (
    <div className="layout">
      <header className="layout__topnav">
        <NavLink to="/" className="layout__logo">
          {/* <img className="layout__logo-img" src={logo} alt="" /> */}
          <span className="layout__logo-title">Stardew Valley</span>
          <span className="layout__logo-subtitle">Perfection Tracker</span>
        </NavLink>

        <nav className="layout__topnav-links" aria-label="Main">
          <NavLink to="/" end className={pillClass}>
            Dashboard
          </NavLink>
          {/* TODO: replace with real wiki/about destinations, or drop these
              if the project doesn't need them */}
          <span className="layout__pill">Wiki</span>
          <span className="layout__pill">About</span>
        </nav>

        <div className="layout__user" aria-label="Account">
          {/* TODO: user icon / account */}
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        </div>
      </header>

      <div className="layout__body">
        <aside className="layout__sidebar" aria-label="Categories">
          {pageIcon ? (
            <img className="layout__page-icon" src={pageIcon} alt="" />
          ) : (
            /* No icon for this page: swap for <img src={chicken} alt="" /> when you have the sprite */
            <div className="layout__mascot" aria-hidden="true" />
          )}
          <nav className="layout__sidebar-nav">
            {SIDEBAR_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? 'layout__sidebar-link layout__sidebar-link--active'
                    : 'layout__sidebar-link'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="layout__content">{children}</main>
      </div>
    </div>
  )
}