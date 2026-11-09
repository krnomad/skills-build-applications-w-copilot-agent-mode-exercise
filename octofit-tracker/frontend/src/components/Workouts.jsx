import { CollectionState, PageHeading } from './CollectionState.jsx'
import { useApiCollection } from '../hooks/useApiCollection.js'

function Workouts() {
  const { items, loading, error } = useApiCollection('workouts')

  return (
    <section>
      <PageHeading
        eyebrow="Your next session"
        title="Workouts"
        description="Training ideas for every pace and experience level."
      />
      <CollectionState
        loading={loading}
        error={error}
        items={items}
        emptyMessage="No workouts are available right now."
      />
      {!loading && !error && items.length > 0 && (
        <div className="workout-grid">
          {items.map((workout) => (
            <article className="workout-item" key={workout._id}>
              <span className="difficulty">{workout.difficulty || 'All levels'}</span>
              <h2>{workout.name || 'Workout'}</h2>
              <p>{workout.description || 'No description available.'}</p>
              <p className="workout-meta mb-0">
                {workout.activityType || 'Training'} · {workout.durationMinutes ?? '—'} min
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts