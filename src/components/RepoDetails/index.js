import React from 'react'
import './index.css'

const RepoDetails = ({repo}) => {
  const {
    name,
    description,
    stargazers_count: stargazersCount,
    forks_count: forksCount,
    html_url: htmlUrl,
    language,
  } = repo

  return (
    <div className="repo-details-card">
      <h3 className="repo-name">
        <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </h3>
      <p className="repo-description">{description}</p>
      <div className="repo-meta">
        <span>⭐ {stargazersCount}</span>
        <span>🍴 {forksCount}</span>
        <span>📝 {language}</span>
      </div>
    </div>
  )
}

export default RepoDetails
