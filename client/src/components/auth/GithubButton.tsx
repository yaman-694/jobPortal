export default function GithubButton() {
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:3000/auth/github'
  }
  return (
    <div>
      <button onClick={handleGithubLogin}>Github</button>
    </div>
  )
}
