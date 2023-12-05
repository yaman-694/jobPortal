import React from 'react'
import ErrorMessage from '../components/ui/ErrorMessage'

export default function ChangePassword() {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (password === newPassword) {
        throw new Error('Password and new password cannot be same')
      }
      if (newPassword.length < 6) {
        throw new Error('Password must be greater than 6 characters')
      }
      if (password.length === 0 || newPassword.length === 0) {
        throw new Error('Password cannot be empty')
      }
      setLoading(true)
      const response = await fetch(
        '/api/v1/crm/update-profile/password-update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            password,
            newPassword
          })
        }
      )

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message)
      }
      alert(data.message)
      setPassword('')
      setNewPassword('')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }
  return (
    <div className="profile__section">
      <div className="profile container">
        <form onSubmit={handleSubmit} className="profile__form">
          <div className="profile__form--container">
            <h3 className="profile__subheading">Change Password</h3>
            <div className="profile__form--update">
              <div className="information">
                <input
                  className="input__fields"
                  type="password"
                  placeholder="Old Password"
                  onChange={e => setPassword(e.target.value)}
                  id="password"
                />
              </div>
              <div className="information">
                <input
                  className="input__fields"
                  type="password"
                  placeholder="New Password"
                  onChange={e => setNewPassword(e.target.value)}
                  id="new__password"
                />
              </div>
            </div>
            <button className="profile__btn" disabled={loading}>
              {loading ? 'Loading...' : 'Change Password'}
            </button>
          </div>

          {error && <ErrorMessage message={error} />}
        </form>
      </div>
    </div>
  )
}
