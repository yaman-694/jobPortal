import {  NavLink, Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
    <div>
      <nav className="home container">
        <ul>
          <li>
            <NavLink className='nav__home__link' to="dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink className='nav__home__link' to="/jobs-status">Application Status</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
