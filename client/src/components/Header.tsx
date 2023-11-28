import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'

export default function Header() {
  const { currentUser } = useAppSelector(state => state.user)
  return (
    <header className="header container">
      <div className="logo">
        <h1>
          <Link to="/dashboard">Job Portal</Link>
        </h1>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <NavLink to="/dashboard">Home</NavLink>
          </li>
          <li>
            <NavLink to="/jobs">Jobs</NavLink>
          </li>
          {!currentUser?.firstname && (
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          )}
          {currentUser?.firstname ? (
            <li>
              <NavLink to="/profile">Hi {currentUser?.firstname}</NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/profile">Sign In</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
