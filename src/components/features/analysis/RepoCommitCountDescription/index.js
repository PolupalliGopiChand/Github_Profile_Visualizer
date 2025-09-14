import './index.css'

const RepoCommitCountDescription = ({descriptions}) => {
  if (!descriptions || Object.keys(descriptions).length === 0) {
    return (
      <div className="no-descriptions">
        <p>No repository descriptions available.</p>
      </div>
    )
  }

  return (
    <div className="descriptions-container">
      {Object.entries(descriptions).map(([repoName, description]) => (
        <div key={repoName} className="description-item">
          <div className="repo-header">
            <h4 className="repo-name">{repoName}</h4>
            <div className="repo-indicator" />
          </div>
          <p className="repo-description">{description}</p>
        </div>
      ))}
    </div>
  )
}

export default RepoCommitCountDescription
