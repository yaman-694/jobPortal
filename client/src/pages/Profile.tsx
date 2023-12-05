import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { signOut } from '../redux/jobs/jobsSlice'
import {
  UserWithFormData,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess
} from '../redux/user/userSlice'

export const SignOut = () => {
  const dispatch = useAppDispatch()
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const response = await fetch('/api/v1/logout', {
        method: 'GET'
      })
      if (response.ok) {
        if (response.redirected) {
          const newLocation = response.headers.get('Location')
          dispatch(signOutUserSuccess())
          dispatch(signOut())
          window.location.href = newLocation || '/'
        } else {
          const result = await response.json()
          if (result.success) {
            window.location.href = result.redirectURI || '/'
          } else {
            dispatch(signOutUserFailure(result.error))
            console.error('Logout failed:', result.error)
          }
        }
      } else {
        dispatch(signOutUserFailure(response.statusText))
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(signOutUserFailure(error.message))
      }
    }
  }
  return (
    <div>
      <a className="sign__out" onClick={handleSignOut}>
        Sign Out
      </a>
    </div>
  )
}

const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function Profile() {
  const { currentUser, loading, error } = useAppSelector(state => state.user)
  const currState = {
    _id: currentUser?._id || '',
    firstname: currentUser?.firstname || '',
    lastname: currentUser?.lastname || '',
    email: currentUser?.email || '',
    information: {
      role: currentUser?.information?.role || '',
      skills: currentUser?.information?.skills || '',
      locality: currentUser?.information?.locality || '',
      country: currentUser?.information?.country || '',
      city: currentUser?.information?.city || ''
    }
  }

  const dispatch = useAppDispatch()
  const [resume, setResume] = useState<File | null>(null)
  const [formData, setFormData] = useState<UserWithFormData>(currState)
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleInformationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      information: {
        ...formData.information,
        [e.target.id]: e.target.value
      }
    })
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResume(e.target.files[0])
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const inputData = new FormData()
      inputData.append('firstname', formData.firstname || '')
      inputData.append('lastname', formData.lastname || '')
      inputData.append('email', formData.email || '')
      inputData.append('role', formData.information?.role || '')
      inputData.append('skills', formData.information?.skills || '')
      inputData.append('locality', formData.information?.locality || '')
      inputData.append('country', formData.information?.country || '')
      inputData.append('city', formData.information?.city || '')
      if (resume) {
        inputData.append('resume', resume)
      }
      dispatch(updateUserStart())
      const res = await fetch(`/api/v1/crm/update-profile`, {
        method: 'POST',
        body: inputData
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
      } else {
        dispatch(updateUserSuccess(data.data))
        setUpdateSuccess(true)
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(updateUserFailure(error.message))
      }
    }
  }
  return (
    <div className="profile__section">
      <div className="profile container">
        <form onSubmit={handleSubmit} className="profile__form">
          {/* username */}
          <div className="profile__form--container">
            <h3 className="profile__subheading">My Profile</h3>
            <div className="profile__form--update">
              <div className="information">
                <label>Preferred Name</label>
                <p className="preferred__name">
                  {capitalizeFirst(currentUser.firstname) +
                    ' ' +
                    capitalizeFirst(currentUser.lastname)}
                </p>
              </div>

              {/* <div className="name"> */}
              <div className="information">
                <label>First Name</label>
                <input
                  className="input__fields"
                  type="text"
                  defaultValue={currentUser?.firstname}
                  onChange={handleChange}
                  placeholder="firstname"
                  id="firstname"
                />
              </div>
              <div className="information">
                <label>Last Name</label>
                <input
                  className="input__fields"
                  type="text"
                  defaultValue={currentUser?.lastname}
                  onChange={handleChange}
                  placeholder="lastname"
                  id="lastname"
                />
              </div>
            </div>
            {/* </div> */}
          </div>

          {/* account security */}
          <div className="profile__form--container">
            <h3 className="profile__subheading">Account Security </h3>
            <div className="profile__form--update">
              <div className="information">
                <div>
                  <label>Email</label>
                  <p>Set a email to connect recruiter</p>
                </div>
                <input
                  className="input__fields"
                  type="email"
                  defaultValue={currentUser?.email}
                  onChange={handleChange}
                  placeholder="email"
                  id="email"
                />
              </div>
              <div className="information password">
                <div>
                  <label>Password</label>
                  <p>Set a strong password to login to your account</p>
                </div>
                <div className="password__button">
                  <Link to="change-password">Change Password</Link>
                </div>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="profile__form--container">
            <h3 className="profile__subheading">Information</h3>
            <div className="profile__form--update">
              <div className="information">
                <label>Role</label>
                <input
                  className="input__fields"
                  type="text"
                  defaultValue={currentUser?.information?.role}
                  onChange={handleInformationChange}
                  placeholder="role"
                  id="role"
                />
              </div>
              <div className="information">
                <label>Skill</label>
                <input
                  className="input__fields"
                  type="text"
                  defaultValue={currentUser?.information?.skills}
                  onChange={handleInformationChange}
                  placeholder="skills"
                  id="skills"
                />
              </div>
              <div className="information">
                <label>Country</label>
                <input
                  className="input__fields"
                  type="text"
                  defaultValue={currentUser?.information?.country}
                  onChange={handleInformationChange}
                  placeholder="country"
                  id="country"
                />
              </div>
              <div className="information">
                <label>City</label>
                <input
                  className="input__fields"
                  type="text"
                  defaultValue={currentUser?.information?.city}
                  onChange={handleInformationChange}
                  placeholder="city"
                  id="city"
                />
              </div>
              <div className="information">
                <label>Locality</label>
                <input
                  className="input__fields"
                  type="text"
                  defaultValue={currentUser?.information?.locality}
                  onChange={handleInformationChange}
                  placeholder="locality"
                  id="locality"
                />
              </div>
              <div className="information input__file--container">
                <label>Resume</label>
                <input
                  className="input__fields"
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>
          </div>
          <div className="preview-resume">
            {currentUser?.information?.resume?.file_link ? (
              <a
                href={currentUser?.information?.resume?.file_link}
                target="_blank"
                rel="noreferrer">
                Preview Resume
              </a>
            ) : (
              <p
                style={{
                  color: '#f43f5e',
                  fontWeight: 'bold',
                  fontSize: '1.6rem'
                }}>
                No resume uploaded
              </p>
            )}
          </div>

          <button className="profile__btn" disabled={loading}>
            {loading ? 'Loading...' : 'Update'}
          </button>

          {/* Danger */}
          <div className="profile__form--container">
            <h3 className="profile__subheading">Account</h3>
            <div className="profile__form--update">
              <div className="information">
                <div>
                  <label>Sign Out</label>
                  <p>Sign out to clear user session on this browser</p>
                </div>
                <SignOut />
              </div>
            </div>
          </div>
        </form>
        {updateSuccess ? <p>Profile Updated</p> : ''}
        {error ? <p>{error}</p> : ''}
      </div>
    </div>
  )
}
