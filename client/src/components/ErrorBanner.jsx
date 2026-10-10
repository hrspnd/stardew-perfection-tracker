/**
 * ErrorBanner
 * Small notice for a change that could not be saved. The page stays on screen
 * (the change was rolled back), so the person can keep working or dismiss it.
 *
 * Props:
 *   message: string
 *   onDismiss?: () => void
 */
export default function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="error-banner" role="alert">
      <p className="error-banner__message">Your last change wasn&rsquo;t saved. ({message})</p>
      {onDismiss && (
        <button type="button" className="error-banner__dismiss" onClick={onDismiss}>
          Dismiss
        </button>
      )}
    </div>
  )
}