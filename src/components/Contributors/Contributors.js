import React, {useContext} from 'react'
import {UsernameContext} from '../../context/UsernameContext'
import './Contributors.css'

const Contributors = ({contributors}) => {
  const {username} = useContext(UsernameContext)

  if (!contributors || contributors.length === 0) {
    return (
      <p className="contributors__no-data">
        No contributors available for {username}'s repositories.
      </p>
    )
  }

  return (
    <div className="contributors__container">
      <h2 className="contributors__title">Contributors</h2>
      <ul className="contributors__list">
        {contributors.map(contributor => (
          <li key={contributor.id} className="contributors__item">
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="contributors__avatar"
            />
            <span className="contributors__name">{contributor.login}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Contributors
