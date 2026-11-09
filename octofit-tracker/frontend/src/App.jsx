import { Link, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'

function App() {
  return (
    <div className="min-vh-100">
      <header className="border-bottom bg-white">
        <div className="container d-flex align-items-center py-3">
          <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none text-dark">
            <img src={octofitLogo} alt="" width="40" height="40" />
            <span className="fw-semibold">OctoFit Tracker</span>
          </Link>
        </div>
      </header>
      <main className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <h1 className="h3 mb-2">Activity</h1>
                <p className="text-secondary mb-0">No activity recorded yet.</p>
              </section>
            }
          />
          <Route
            path="*"
            element={
              <section>
                <h1 className="h3 mb-2">Page not found</h1>
                <Link to="/">Return to activity</Link>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
