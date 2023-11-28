// SignupForm.tsx

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GithubButton from './GithubButton'
import GoogleButton from './GoogleButton'

const SignupForm: React.FC = () => {
  const navigate = useNavigate()
  const [firstname, setFirstname] = useState('')
  const [error, setError] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      const data = await fetch('/api/v1/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          cpassword
        })
      })
      if (!data.ok) {
        const error = await data.json()
        throw new Error(error.message)
        return
      }
      navigate(`/login`)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    }
  }

  return (
    <div className="form__container">
      <h2 className="heading">Sign Up</h2>
      <form className="signup" onSubmit={handleSubmit}>
        <div className="name">
          <div className="input__fields">
            <label>First Name:</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="input__fields">
            <label>Last Name:</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={e => setLastname(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input__fields">
          <label>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input__fields">
          <label>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input__fields">
          <label>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={cpassword}
            onChange={e => setCpassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
      <div>
        <p>
          Already have an account? <Link to="/login">SignIn</Link>
        </p>
        <div className="outh__btn">
          <GoogleButton />
          <GithubButton />
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default SignupForm
