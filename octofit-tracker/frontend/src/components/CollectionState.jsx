export function PageHeading({ eyebrow, title, description }) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
    </div>
  )
}

export function CollectionState({ loading, error, items, emptyMessage }) {
  if (loading) {
    return <p className="status-message" role="status">Loading records...</p>
  }

  if (error) {
    return <p className="status-message error" role="alert">Could not load records: {error}</p>
  }

  if (items.length === 0) {
    return <p className="empty-message">{emptyMessage}</p>
  }

  return null
}