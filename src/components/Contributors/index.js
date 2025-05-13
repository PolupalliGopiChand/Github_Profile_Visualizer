import React from 'react'
import './index.css'

const Contributors = ({contributors}) => (
  <div className="contributors-container">
    <h2 className="contributors-heading">Top Contributors</h2>
    <ul className="contributors-list">
      {contributors.map(contributor => {
        const {avatar_url: avatarUrl, html_url: htmlUrl, login} = contributor
        return (
          <li key={login} className="contributor-item">
            <img src={avatarUrl} alt={login} className="contributor-avatar" />
            <a
              href={htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contributor-link"
            >
              {login}
            </a>
          </li>
        )
      })}
    </ul>
  </div>
)

export default Contributors
