import { CollectionState, PageHeading } from './CollectionState.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'
import { relationName } from '../utils/formatters.js'

function Leaderboard() {
  const { items, loading, error } = useApiCollection('leaderboard')
  const rankedItems = [...items].sort((first, second) => (second.points ?? 0) - (first.points ?? 0))

  return (
    <section>
      <PageHeading
        eyebrow="Community standings"
        title="Leaderboard"
        description="A running view of points earned by athletes and teams."
      />
      <CollectionState
        loading={loading}
        error={error}
        items={items}
        emptyMessage="The leaderboard is waiting for its first results."
      />
      {!loading && !error && items.length > 0 && (
        <div className="data-table-wrap">
          <table className="table data-table">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Athlete</th>
                <th scope="col">Team</th>
                <th scope="col">Period</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {rankedItems.map((entry, index) => (
                <tr key={entry._id}>
                  <td>{String(index + 1).padStart(2, '0')}</td>
                  <td>{relationName(entry.user)}</td>
                  <td>{relationName(entry.team)}</td>
                  <td>{entry.period || '—'}</td>
                  <td><strong>{entry.points ?? 0}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard