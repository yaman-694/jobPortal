import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import { JobStatusProvider } from './contexts/JobStatusContext'
import HomeLayout from './layouts/HomeLayout'
import Layout from './layouts/layout'
import ChangePassword from './pages/ChangePassword'
import DashBoard from './pages/Dashboard'
import JobStatus from './pages/JobStatus'
import Jobs from './pages/Jobs'
import LoginIn from './pages/LoginIn'
import Onborading from './pages/Onborading'
import Profile from './pages/Profile'
import Signup from './pages/SignUp'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginIn />} />
          <Route path="signup" element={<Signup />} />
          <Route path="information/:id" element={<Onborading />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <JobStatusProvider>
                  <HomeLayout />
                </JobStatusProvider>
              }>
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="jobs-status" element={<JobStatus />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="jobs" element={<Jobs />} />
            <Route
              path="profile/change-password"
              element={<ChangePassword />}
            />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
