import { CollectionState, PageHeading } from './CollectionState.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'
import { relationName } from '../utils/formatters.js'

function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : undefined
  const { items, loading, error } = useApiCollection('users', endpoint)

  return (
    <section>
      <PageHeading
        eyebrow="The community"
        title="Athletes"
        description="People showing up, putting in the work, and moving forward."
      />
      <CollectionState
        loading={loading}
        error={error}
        items={items}
        emptyMessage="No athletes have registered yet."
      />
      {!loading && !error && items.length > 0 && (
        <div className="data-table-wrap">
          <table className="table data-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id}>
                  <td><strong>{user.name || 'Unnamed athlete'}</strong></td>
                  <td>{user.username ? `@${user.username}` : '—'}</td>
                  <td>{user.email || '—'}</td>
                  <td>{relationName(user.team)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users