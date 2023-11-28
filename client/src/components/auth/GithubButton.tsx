export default function GithubButton() {
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:3000/auth/github'
  }
  return (
    <div>
      <button className="btn github" onClick={handleGithubLogin}>
        Github
      </button>
    </div>
  )
}
