// LoginForm.tsx

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  signInFailure,
  signInStart,
  signInSuccess
} from '../../redux/user/userSlice'
import { useAppDispatch, useAppSelector } from './../../redux/hooks'
import GithubButton from './GithubButton'
import GoogleButton from './GoogleButton'

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
      if(!response.ok) {
        throw new Error('Wrong email or password')
      }
      const data = await response.json()
      dispatch(signInSuccess(data.user))
      if (!data.user.slug) {
        navigate(`/information/${data.user._id}`)
        return
      }
      navigate('/dashboard')
    } catch (cerror) {
      if (cerror instanceof Error) dispatch(signInFailure(cerror.message))
    }
  }

  useEffect(() => {
    // Make the request to fetch user information
    const fetchUser = async () => {
      try {
        dispatch(signInStart())
        const response = await fetch(
          'http://localhost:3000/auth/google/success',
          {
            method: 'GET',
            credentials: 'include'
          }
        )
        const data = await response.json()
        dispatch(signInSuccess(data.user))
        if(!data.success) {
          navigate('/login')
          return;
        }
        if (!data.user.slug) {
          navigate(`/information/${data.user._id}`)
          return
        }
        navigate('/')
      } catch (error) {

      }
    }
    fetchUser()
  }, [])

  return (
    <div className='form__container'>
      <h2 className='heading'>Sign In</h2>
      <form className='login' onSubmit={handleSubmit}>
        <div className="input__fields">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input__fields">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
            required
          />
        </div>
        <button className='btn' disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
        {/* <button className="btn">Sign In</button> */}
      </form>
      <p>
        Don't have an account? <Link to="/signup">SignUp</Link>
      </p>
      <div className="outh__btn">
        <GoogleButton />
        <GithubButton />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default LoginForm
