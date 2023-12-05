// App.tsx

import React from 'react'
import signin from '../assets/images/signin.jpg'
import LoginForm from '../components/auth/LoginForm'

const LoginIn: React.FC = () => {
  // Function to handle login logic

  return (
    <div className="container auth">
      <div className="auth__container">
        <div className="auth__img">
          <img src={signin} alt="" />
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginIn
