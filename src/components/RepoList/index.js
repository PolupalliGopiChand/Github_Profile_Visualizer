import React from 'react'
import './index.css'
import {Link} from 'react-router-dom'

const RepoList = ({repositories}) => {
  if (!repositories || repositories.length === 0) {
    return <p className="no-repos">No repositories available.</p>
  }

  return (
    <div className="repo-list-container">
      <h2 className="list-heading">Top Repositories</h2>
      <ul className="repo-list">
        {repositories.map(repo => (
          <li key={repo.id} className="repo-card">
            <Link to={`/repo/${repo.name}`} className="repo-link">
              <h3>{repo.name}</h3>
              <p>{repo.description || 'No description available.'}</p>
              <div className="repo-meta">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                <span>💻 {repo.language}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RepoList
