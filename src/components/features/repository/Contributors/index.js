import './index.css'

const Contributors = ({contributors}) => {
  if (!contributors || contributors.length === 0) {
    return (
      <div className="no-contributors">
        <p>No contributors found for this repository.</p>
      </div>
    )
  }

  return (
    <div className="contributors-list">
      {contributors.map(contributor => (
        <div key={contributor.id} className="contributor-item">
          <img
            src={contributor.avatarUrl}
            alt={contributor.login}
            className="contributor-avatar"
          />
          <div className="contributor-info">
            <span className="contributor-name">{contributor.login}</span>
            <span className="contributor-contributions">
              {contributor.contributions} contributions
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Contributors
