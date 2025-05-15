// src/components/RepoList/RepoList.js
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './RepoList.css'

function RepoList() {
  const { username } = useParams()
  const [repos, setRepos] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`)
        if (!response.ok) {
          throw new Error('GitHub user not found')
        }
        const data = await response.json()
        setRepos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username])

  if (loading) return <div className="repo-loading">Loading repositories...</div>
  if (error) return <div className="repo-error">{error}</div>

  return (
    <div className="repo-list-container">
      <h2>{username}'s Repositories</h2>
      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-item">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description || 'No description provided'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RepoList
