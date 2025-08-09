import {useState, useEffect, useContext} from 'react'
import {UsernameContext} from '../../context/UsernameContext'
import './index.css'

const RepoStats = () => {
  const {username} = useContext(UsernameContext)
  const [stats, setStats] = useState({
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    totalIssues: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const fetchRepoStats = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
        )
        if (!response.ok) throw new Error('Failed to fetch repositories')
        const repos = await response.json()
        const aggregatedStats = repos.reduce(
          (acc, repo) => ({
            totalRepos: acc.totalRepos + 1,
            totalStars: acc.totalStars + (repo.stargazers_count || 0),
            totalForks: acc.totalForks + (repo.forks_count || 0),
            totalIssues: acc.totalIssues + (repo.open_issues_count || 0),
          }),
          {totalRepos: 0, totalStars: 0, totalForks: 0, totalIssues: 0},
        )
        setStats(aggregatedStats)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepoStats()
  }, [username])

  if (loading)
    return (
      <div className="repo-stats-container">Loading repository stats...</div>
    )
  if (error)
    return <div className="repo-stats-container error">Error: {error}</div>
  if (!stats.totalRepos)
    return (
      <div className="repo-stats-container">No repository stats available.</div>
    )

  return (
    <div className="repo-stats">
      <h3>Repository Statistics</h3>
      <div className="stats-card">
        <p>
          <strong>Total Repositories:</strong> {stats.totalRepos}
        </p>
        <p>
          <strong>Total Stars:</strong> {stats.totalStars}
        </p>
        <p>
          <strong>Total Forks:</strong> {stats.totalForks}
        </p>
        <p>
          <strong>Total Open Issues:</strong> {stats.totalIssues}
        </p>
      </div>
    </div>
  )
}

export default RepoStats
