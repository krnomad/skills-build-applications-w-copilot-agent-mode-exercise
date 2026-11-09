import { CollectionState, PageHeading } from './CollectionState.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : undefined
  const { items, loading, error } = useApiCollection('teams', endpoint)

  return (
    <section>
      <PageHeading
        eyebrow="Train together"
        title="Teams"
        description="Find the crews building consistency together."
      />
      <CollectionState
        loading={loading}
        error={error}
        items={items}
        emptyMessage="No teams have joined yet."
      />
      {!loading && !error && items.length > 0 && (
        <div className="data-table-wrap">
          <table className="table data-table">
            <thead>
              <tr>
                <th scope="col">Team</th>
                <th scope="col">About</th>
                <th scope="col">Members</th>
              </tr>
            </thead>
            <tbody>
              {items.map((team) => (
                <tr key={team._id}>
                  <td><strong>{team.name || 'Unnamed team'}</strong></td>
                  <td>{team.description || '—'}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Teams