// SignupForm.tsx

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  signInFailure,
  signInStart,
  signInSuccess
} from '../../redux/user/userSlice'
import ErrorMessage from '../ui/ErrorMessage'
import { useAppDispatch } from './../../redux/hooks'
import GithubButton from './GithubButton'
import GoogleButton from './GoogleButton'

const SignupForm: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
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
      if (!firstname || !lastname || !email || !password || !cpassword) {
        throw new Error('Please fill in all fields')
      }
      if (password !== cpassword) {
        throw new Error('Passwords do not match')
      }

      dispatch(signInStart())
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
        dispatch(signInFailure(error.message))
        throw new Error(error.message)
      }
      const user = await data.json()
      dispatch(signInSuccess(user.data))

      navigate(`/information/${user.data._id}`)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    }
  }

  return (
    <div className="form__container">
      <h2 className="heading">Sign Up</h2>
      <form className="signup" onSubmit={handleSubmit}>
        <div className="input__fields">
          <input
            type="text"
            placeholder="First Name"
            id="firstname"
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="input__fields">
          <input
            type="text"
            id="lastname"
            placeholder="Last Name"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="input__fields">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input__fields">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input__fields">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={e => setCpassword(e.target.value)}
            required
          />
        </div>
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

      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export default SignupForm
