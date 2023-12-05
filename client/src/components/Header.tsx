import { Link, NavLink,useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'

import Avatar from './ui/Avatar'

export default function Header() {
  const { currentUser } = useAppSelector(state => state.user)
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/profile')
  }
  return (
    <header className="header container">
      <div className="logo">
        <h1>
          <Link to="/dashboard">Por</Link>
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
            <li onClick={handleClick}>
              <Avatar name={currentUser.firstname} size={40} />
            </li>
          ) : (
            <li>
              <NavLink to="/login">Sign In</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
