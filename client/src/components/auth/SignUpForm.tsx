// SignupForm.tsx

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GithubButton from './GithubButton';
import GoogleButton from './GoogleButton';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(cpassword)
    const data = await fetch('/api/v1/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, lastname, email, password, cpassword })
    })
    if(!data.ok) {
      console.log(data)
      return
    }
    const response = await data.json()
    navigate(`/information/${response.data._id}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            id='firstname'
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            id="confirmPassword"
            value={cpassword}
            onChange={e => setCpassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <GoogleButton />
      <GithubButton />
    </div>
  )
}

export default SignupForm
