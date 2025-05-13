import React from 'react'
import './index.css'

const RepoStats = ({repo}) => {
  const {
    stargazers_count: stargazersCount,
    forks_count: forksCount,
    open_issues_count: openIssuesCount,
    watchers_count: watchersCount,
  } = repo

  return (
    <div className="repo-stats">
      <div className="stat-box">
        <h4>⭐ Stars</h4>
        <p>{stargazersCount}</p>
      </div>
      <div className="stat-box">
        <h4>🍴 Forks</h4>
        <p>{forksCount}</p>
      </div>
      <div className="stat-box">
        <h4>👁️ Watchers</h4>
        <p>{watchersCount}</p>
      </div>
      <div className="stat-box">
        <h4>❗ Open Issues</h4>
        <p>{openIssuesCount}</p>
      </div>
    </div>
  )
}

export default RepoStats
