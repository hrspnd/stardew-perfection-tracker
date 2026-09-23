import { Link } from 'react-router-dom'

/**
 * DashboardSummaryCard
 * Small card used only on the Dashboard - one per category.
 * Shows "name - percentage" inline, links out to that category's page.
 *
 * Props:
 *   label: string
 *   percent: number  (0-100)
 *   href: string
 */

export default function DashboardSummaryCard({ label, percent, href }) {
  return (
    <p><Link to={href} className="dashboard-summary-card">
      {label} - {percent}% 
    </Link></p>
  )
}