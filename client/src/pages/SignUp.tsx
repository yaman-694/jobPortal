import SignupForm from "../components/auth/SignUpForm"
import signup from "../assets/images/signup.jpg"
const Signup = () => {
  // State variables for form fields

  return (
    <div className="container auth">
      <div className="auth__container">
        <div className="auth__img">
          <img src={signup} alt="" />
        </div>
        <SignupForm />
      </div>
    </div>
  )
}

export default Signup
