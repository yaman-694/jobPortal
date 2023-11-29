import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './../redux/hooks'
import {
  onBoardingFailure,
  onBoardingStart,
  onBoardingSuccess
} from './../redux/user/userSlice'
import { SignOut } from './Profile'
// import { UserInformation } from '../interface'

export default function Onboarding() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentUser, loading, error } = useAppSelector(state => state.user)
  const [formData, setFormData] = useState({
    role: '',
    skills: '',
    locality: '',
    country: '',
    city: ''
  })
  const [resume, setResume] = useState<File | null>(null)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResume(e.target.files[0])
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      const inputData = new FormData()
      inputData.append('role', formData.role)
      inputData.append('skills', formData.skills)
      inputData.append('locality', formData.locality)
      inputData.append('country', formData.country)
      inputData.append('city', formData.city)
      if (resume) {
        inputData.append('resume', resume)
      }
      console.log(inputData)
      dispatch(onBoardingStart())
      const response = await fetch(`/api/v1/crm/create/${id}`, {
        method: 'POST',
        body: inputData
      })
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message)
      }
      dispatch(onBoardingSuccess(data.data))
      // redirect to home page
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        dispatch(onBoardingFailure(error.message))
        navigate('/signin')
      }
    }
  }

  useEffect(() => {
    if (!currentUser?._id) {
      navigate('/login')
    } else if (currentUser?.slug) {
      navigate('/dashboard')
    }
  })

  return (
    <div className="form__container">
      <h1 className='heading'>Onboarding Form</h1>
      <form onSubmit={handleSubmit} className="onboard__form">
        <div className="input__fields">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input__fields">
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input__fields">
          <label>locality:</label>
          <input
            type="text"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input__fields">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input__fields">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input__fields">
          <label>Resume:</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </div>
        <button className='btn' type="submit" disabled={loading}>
          {loading ? 'Loading..' : 'submit'}
        </button>

        <SignOut />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}
