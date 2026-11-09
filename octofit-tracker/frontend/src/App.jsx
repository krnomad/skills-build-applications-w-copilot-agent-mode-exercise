import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell min-vh-100">
      <header className="app-header">
        <div className="container app-header-inner">
          <Link to="/activities" className="brand-lockup">
            <img src={octofitLogo} alt="" width="42" height="42" />
            <span>OctoFit <strong>Tracker</strong></span>
          </Link>
          <nav className="primary-nav" aria-label="Main navigation">
            {navigation.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="*"
            element={
              <section className="empty-state">
                <p className="eyebrow">404 / Not found</p>
                <h1>That page isn’t on the track.</h1>
                <Link to="/activities" className="text-link">Return to activities</Link>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
