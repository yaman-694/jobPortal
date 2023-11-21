import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginIn from './pages/LoginIn'
import Signup from './pages/SignUp'
import Onborading from './pages/Onborading'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import Jobs from './pages/Jobs'
import Layout from './layouts/layout'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginIn />} />
          <Route path="signup" element={<Signup />} />
          <Route path="information/:id" element={<Onborading />} />
          <Route element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="jobs" element={<Jobs />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
