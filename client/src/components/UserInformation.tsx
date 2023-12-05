import { Link } from 'react-router-dom'
import { UserWithFormData } from '../redux/user/userSlice'

export const UserInformation: React.FC<{ currentUser: UserWithFormData }> = ({
  currentUser
}) => {
  return (
    <div className="home__heading">
      <h1>Hi, {currentUser?.firstname.toUpperCase()}!</h1>
      <p>Monitor your job applications</p>
      <div className="user__details">
        <p>
          <span>Role - </span>
          {currentUser?.information.role}
        </p>
        <p>
          <span>Skill - </span>
          {currentUser?.information.skills}
        </p>
        <p>
          <span>Country - </span>
          {currentUser?.information.country}
        </p>
        <div className="button__container">
          {currentUser?.information.resume?.file_link && (
            <a className='download__resume'
              target="_blank"
              rel="noreferrer"
              href={currentUser?.information.resume?.file_link}>
              Resume
            </a>
          )}
          <Link className="edit__profile" to="/profile">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
