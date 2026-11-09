import { CollectionState, PageHeading } from './CollectionState.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'
import { formatDate, relationName } from '../utils/formatters.js'

function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : undefined
  const { items, loading, error } = useApiCollection('activities', endpoint)

  return (
    <section>
      <PageHeading
        eyebrow="Movement log"
        title="Activities"
        description="Recent training recorded across the OctoFit community."
      />
      <CollectionState
        loading={loading}
        error={error}
        items={items}
        emptyMessage="No activities have been recorded yet."
      />
      {!loading && !error && items.length > 0 && (
        <div className="data-table-wrap">
          <table className="table data-table">
            <thead>
              <tr>
                <th scope="col">Activity</th>
                <th scope="col">Athlete</th>
                <th scope="col">Team</th>
                <th scope="col">Duration</th>
                <th scope="col">Distance</th>
                <th scope="col">Calories</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.activityType || 'Activity'}</td>
                  <td>{relationName(activity.user)}</td>
                  <td>{relationName(activity.team)}</td>
                  <td>{activity.durationMinutes ?? '—'} min</td>
                  <td>{activity.distanceKm ?? '—'} km</td>
                  <td>{activity.calories ?? '—'}</td>
                  <td>{formatDate(activity.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities