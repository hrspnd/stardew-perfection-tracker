import { Link } from 'react-router-dom'

/**
 * ProgressRing
 * SVG donut. Used inside DashboardSummaryCard and the Total Perfection card.
 *
 * Props:
 *   percent: number (0-100)
 *   size: number (px)
 *   stroke: number (px)
 *   className: string (set color via CSS: .progress-ring__fill { stroke })
 */
export function ProgressRing({ percent, size = 96, stroke = 10, className = '' }) {
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - Math.min(Math.max(percent, 0), 100) / 100)

  return (
    <div
      className={`progress-ring ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${percent}% complete`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="progress-ring__track"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className="progress-ring__fill"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="progress-ring__label">{percent}%</span>
    </div>
  )
}

/**
 * DashboardSummaryCard
 * Card used only on the Dashboard - one per category.
 * Icon + title + description on the left, progress ring on the right.
 * The whole card links to that category's page.
 *
 * Props:
 *   label: string
 *   description: string
 *   icon: string | undefined  (image URL; falls back to an empty box)
 *   percent: number  (0-100)
 *   href: string
 */
export default function DashboardSummaryCard({ label, description, icon, percent, href }) {
  return (
    <Link to={href} className="dashboard-summary-card">
      {icon ? (
        <img className="dashboard-summary-card__icon" src={icon} alt="" />
      ) : (
        <span className="dashboard-summary-card__icon dashboard-summary-card__icon--placeholder" />
      )}

      <div className="dashboard-summary-card__text">
        <h3 className="dashboard-summary-card__title">{label}</h3>
        <p className="dashboard-summary-card__description">{description}</p>
      </div>

      <ProgressRing percent={percent} size={96} stroke={9} className="progress-ring--green" />
    </Link>
  )
}