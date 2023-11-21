import { Link } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'

export default function Header() {
  const { currentUser } = useAppSelector(state => state.user)
  return (
    <header className="header container">
      <div className="logo">
        <h1>Job Board</h1>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          {!currentUser.firstname && (
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          )}
            {currentUser.firstname ? (
              <Link to="/profile">
                <li>Hi {currentUser.firstname}</li>
              </Link>
            ) : (
              <Link to="/profile">
                <li>Sign In</li>
              </Link>
            )}
        </ul>
      </nav>
    </header>
  )
}
