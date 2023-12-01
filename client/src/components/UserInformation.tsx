import { Link } from "react-router-dom"
import { UserWithFormData } from "../redux/user/userSlice"

export const UserInformation: React.FC<{ currentUser: UserWithFormData }> = ({
  currentUser
}) => {
  return (
    <div className="home__heading">
      <h1>Hi, {currentUser?.firstname.toUpperCase()}!</h1>
      <p>Monitor You Job application</p>
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
        {currentUser?.information.resume?.file_link && (
          <button>
            <a
              target="_blank"
              rel="noreferrer"
              href={currentUser?.information.resume?.file_link}>
              Download Resume
            </a>
          </button>
        )}
        <Link to="/profile">Edit Profile</Link>
      </div>
    </div>
  )
}
