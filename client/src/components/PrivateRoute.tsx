import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
export default function PrivateRoute() {
  const { currentUser } = useAppSelector(state => state.user)
  return (
    <div>
      {currentUser?.firstname ? (
        currentUser.slug ? (
          <Outlet />
        ) : (
          <Navigate to={'information/' + currentUser._id} />
        )
      ) : (
        <Navigate to="login" />
      )}
    </div>
  )
}
