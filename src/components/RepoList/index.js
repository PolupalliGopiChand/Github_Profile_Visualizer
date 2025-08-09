import {useState, useEffect, useContext} from 'react'
import {UsernameContext} from '../../context/UsernameContext'
import './index.css'

const RepoList = ({onSelectRepo}) => {
  const {username} = useContext(UsernameContext)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const fetchRepos = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        )
        if (!response.ok) throw new Error('Failed to fetch repositories')
        const data = await response.json()
        setRepos(
          data.map(repo => ({
            name: repo.name,
            description: repo.description,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
          })),
        )
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username])

  const handleRepoClick = repoName => {
    if (onSelectRepo) {
      onSelectRepo(repoName)
    }
  }

  const handleKeyDown = (e, repoName) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleRepoClick(repoName)
    }
  }

  if (loading)
    return <div className="repo-list-container">Loading repositories...</div>
  if (error)
    return <div className="repo-list-container error">Error: {error}</div>
  if (!repos.length)
    return <div className="repo-list-container">No repositories found.</div>

  return (
    <div className="repo-list">
      <h3>Repositories</h3>
      <div className="repo-grid">
        {repos.map(repo => (
          <button
            key={repo.name}
            className="repo-card"
            onClick={() => handleRepoClick(repo.name)}
            onKeyDown={e => handleKeyDown(e, repo.name)}
            type="button"
          >
            <h4>{repo.name}</h4>
            {repo.description && (
              <p className="description">{repo.description}</p>
            )}
            <div className="stats">
              <p>
                <strong>Stars:</strong> {repo.stargazers_count}
              </p>
              <p>
                <strong>Forks:</strong> {repo.forks_count}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RepoList
