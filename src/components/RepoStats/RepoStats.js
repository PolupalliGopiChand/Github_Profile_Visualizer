import React from 'react'
import './RepoStats.css'

const RepoStats = ({repos}) => {
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0)
  const totalOpenIssues = repos.reduce(
    (acc, repo) => acc + repo.open_issues_count,
    0,
  )

  return (
    <div className="repoStats__container">
      <h2 className="repoStats__title">Repository Stats</h2>
      <div className="repoStats__stats">
        <div className="repoStats__stat">
          <h3>Total Stars</h3>
          <p>{totalStars}</p>
        </div>
        <div className="repoStats__stat">
          <h3>Total Forks</h3>
          <p>{totalForks}</p>
        </div>
        <div className="repoStats__stat">
          <h3>Total Open Issues</h3>
          <p>{totalOpenIssues}</p>
        </div>
      </div>
    </div>
  )
}

export default RepoStats
