import {useState, useEffect, useContext} from 'react'
import {UsernameContext} from '../../context/UsernameContext'
import './index.css'

const Contributors = () => {
  const {username} = useContext(UsernameContext)
  const [contributors, setContributors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const fetchContributors = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch user's repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos`,
        )
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories')
        const repos = await reposResponse.json()

        // Fetch contributors for each repository
        const contributorPromises = repos.map(async repo => {
          const contribResponse = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/contributors`,
          )
          if (!contribResponse.ok) return []
          const contribData = await contribResponse.json()
          return contribData.map(contrib => ({
            login: contrib.login,
            avatar_url: contrib.avatar_url,
            contributions: contrib.contributions,
            repo: repo.name,
          }))
        })

        // Combine all contributors and remove duplicates
        const allContributors = (await Promise.all(contributorPromises)).flat()
        const uniqueContributors = Array.from(
          new Map(allContributors.map(c => [c.login, c])).values(),
        )

        setContributors(uniqueContributors)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchContributors()
  }, [username])

  if (loading)
    return <div className="contributors-container">Loading contributors...</div>
  if (error)
    return <div className="contributors-container error">Error: {error}</div>
  if (!contributors.length)
    return <div className="contributors-container">No contributors found.</div>

  return (
    <div className="contributors">
      <h3>Contributors</h3>
      <div className="contributor-list">
        {contributors.map(contributor => (
          <div key={contributor.login} className="contributor-card">
            <img
              src={contributor.avatar_url}
              alt={`${contributor.login}'s avatar`}
              className="contributor-avatar"
            />
            <div className="contributor-info">
              <h4>{contributor.login}</h4>
              <p>Total Contributions: {contributor.contributions}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contributors
