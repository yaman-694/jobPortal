import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  User
} from '../redux/user/userSlice'
export default function Profile() {
  const { currentUser, loading, error } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<User>(currentUser)
  const [filePrec, setFilePrec] = useState<number>(0)
  const [fileUrl, setFileUrl] = useState<string>()
  const [fileError, setFileError] = useState<boolean>(false)
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false)

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0])
  }
  const fileRef = React.useRef<HTMLInputElement>(null)

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(deleteUserFailure(error.message))
      }
    }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const response = await fetch('/api/v1/logout', {
        method: 'GET'
      })
      if (response.ok) {
        // Check if the response is a redirect
        if (response.redirected) {
          // Get the new location from the Location header
          const newLocation = response.headers.get('Location')
          dispatch(signOutUserSuccess())
          // Redirect to the new location
          window.location.href = newLocation || '/'
        } else {
          // Process the response as usual (assuming it's JSON)
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
      } else {
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h1 className="pageHeading">Profile</h1>
      <form onSubmit={handleSubmit} className="profileForm">
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          hidden
          ref={fileRef}
          onChange={handleClick}
        />
        <img
          onClick={() => fileRef.current?.click()}
          src={fileUrl || currentUser.avatar}
          alt="profile"
        />
        <p>
          {fileError ? (
            <span>Error Uploading File</span>
          ) : filePrec > 0 && filePrec < 100 ? (
            <span>{`Uploading ${filePrec}%...`}</span>
          ) : filePrec === 100 && !fileError ? (
            <span>Uploaded</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          defaultValue={currentUser?.firstname}
          onChange={handleChange}
          placeholder="username"
          id="username"
        />
        <input
          type="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
          placeholder="email"
          id="email"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="password"
          id="password"
        />
        <button disabled={loading}>{loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className="footerContainer">
        <a onClick={handleDeleteUser}>Delete Account</a>
        <a onClick={handleSignOut}>Sign Out</a>
      </div>
      {updateSuccess ? <p>Profile Updated</p> : ''}
      {error ? <p>{error}</p> : ''}
    </div>
  )
}
