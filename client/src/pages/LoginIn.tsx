// App.tsx

import React from 'react'
import LoginForm from '../components/auth/LoginForm'

const LoginIn: React.FC = () => {
  // Function to handle login logic

  return (
    <div className='container auth'>
      <LoginForm />
    </div>
  )
}

export default LoginIn
