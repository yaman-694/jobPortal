import google from '../../assets/svg/logo-google.svg'

export default function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google'
  }
  return (
    <div>
      <button className="btn google" onClick={handleGoogleLogin}>
        <img src={google} alt="" /> <span>Google</span>
      </button>
    </div>
  )
}
