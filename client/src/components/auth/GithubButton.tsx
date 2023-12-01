import github from '../../assets/svg/logo-github.svg'
export default function GithubButton() {
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:3000/auth/github'
  }
  return (
    <div>
      <button className="btn github" onClick={handleGithubLogin}>
        <img src={github} alt="" /> <span>Github</span>
      </button>
    </div>
  )
}
