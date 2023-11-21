// LoginForm.tsx

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  signInFailure,
  signInStart,
  signInSuccess
} from '../../redux/user/userSlice'
import { useAppDispatch, useAppSelector } from './../../redux/hooks'
import GoogleButton from './GoogleButton'
import GithubButton from './GithubButton'

interface IFormData {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error } = useAppSelector(state => state.user)

  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: ''
  })

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (!formData.email || !formData.password) {
        console.log('Please fill in all fields')
        return
      }
      dispatch(signInStart())
      const response = await fetch('/api/v1/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      console.log(data)
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data.user))
      if (!data.user.slug) {
        navigate(`/information/${data.user._id}`)
        return
      }
      navigate('/')
    } catch (cerror) {
      if (cerror instanceof Error) dispatch(signInFailure(cerror.message))
    }
  }
  
  useEffect(() => {
    // Make the request to fetch user information
    fetch('http://localhost:3000/auth/google/success', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        // Update the user state in Redux store
        dispatch(signInSuccess(data.user))
        navigate('/')
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        {/* <button disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button> */}
        <button className="btn">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">SignUp</Link>
      </p>
      <GoogleButton />
      <GithubButton />
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
    </div>
  )
}

export default LoginForm
