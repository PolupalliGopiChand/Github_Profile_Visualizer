import {useState, useEffect, useContext} from 'react'
import {UsernameContext} from '../../context/UsernameContext'
import './index.css'

const RepoDetails = ({repoName}) => {
  const {username} = useContext(UsernameContext)
  const [repoData, setRepoData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const fetchRepoData = async () => {
      setLoading(true)
      setError(null)

      try {
        let selectedRepoName = repoName
        if (!selectedRepoName) {
          // Fetch the most-starred repository if no repoName is provided
          const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos?sort=stars&per_page=1`,
          )
          if (!reposResponse.ok) throw new Error('Failed to fetch repositories')
          const repos = await reposResponse.json()
          if (repos.length === 0) throw new Error('No repositories found')
          selectedRepoName = repos[0].name
        }

        // Fetch details for the selected repository
        const response = await fetch(
          `https://api.github.com/repos/${username}/${selectedRepoName}`,
        )
        if (!response.ok) throw new Error('Failed to fetch repository details')
        const data = await response.json()
        setRepoData({
          name: data.name,
          description: data.description,
          stargazers_count: data.stargazers_count,
          forks_count: data.forks_count,
          open_issues_count: data.open_issues_count,
          created_at: new Date(data.created_at).toLocaleDateString(),
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepoData()
  }, [username, repoName])

  if (loading)
    return (
      <div className="repo-details-container">
        Loading repository details...
      </div>
    )
  if (error)
    return <div className="repo-details-container error">Error: {error}</div>
  if (!repoData)
    return (
      <div className="repo-details-container">
        No repository data available.
      </div>
    )

  return (
    <div className="repo-details">
      <div className="repo-card">
        <h3>{repoData.name}</h3>
        {repoData.description && (
          <p className="description">{repoData.description}</p>
        )}
        <div className="stats">
          <p>
            <strong>Stars:</strong> {repoData.stargazers_count}
          </p>
          <p>
            <strong>Forks:</strong> {repoData.forks_count}
          </p>
          <p>
            <strong>Open Issues:</strong> {repoData.open_issues_count}
          </p>
          <p>
            <strong>Created:</strong> {repoData.created_at}
          </p>
        </div>
      </div>
    </div>
  )
}

export default RepoDetails
