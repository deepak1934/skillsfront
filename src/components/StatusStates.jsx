import "./StatusStates.css";

export function LoadingState({ label = "Charting the route" }) {
  return (
    <div className="status-block status-loading" role="status" aria-live="polite">
      <svg width="34" height="34" viewBox="0 0 34 34" className="loading-mark">
        <circle
          cx="17"
          cy="17"
          r="13"
          fill="none"
          stroke="var(--line)"
          strokeWidth="2"
        />
        <path
          d="M17 4a13 13 0 0 1 13 13"
          fill="none"
          stroke="var(--trail)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <p>{label}&hellip;</p>
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", hint }) {
  return (
    <div className="status-block status-empty">
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M6 30 Q14 12 20 20 T34 10"
          fill="none"
          stroke="var(--mist)"
          strokeWidth="2"
          strokeDasharray="1 6"
          strokeLinecap="round"
        />
        <circle cx="6" cy="30" r="2.5" fill="var(--mist-bright)" />
        <circle cx="34" cy="10" r="2.5" fill="var(--line)" />
      </svg>
      <h3>{title}</h3>
      {hint && <p className="status-hint">{hint}</p>}
    </div>
  );
}

export function ErrorState({
  title = "The trail's washed out",
  message = "Couldn't reach the server. Check the connection and try again.",
  onRetry,
}) {
  return (
    <div className="status-block status-error">
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M20 4 L36 34 L4 34 Z"
          fill="none"
          stroke="var(--danger)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <line x1="20" y1="15" x2="20" y2="24" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="29" r="1.4" fill="var(--danger)" />
      </svg>
      <h3>{title}</h3>
      <p className="status-hint">{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
