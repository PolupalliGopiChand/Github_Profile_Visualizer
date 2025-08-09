// src/components/NotFound/index.js (artifact_id: 71665be5-9a33-4378-815e-e07bd02c513f)
import {useContext} from 'react'
import {UsernameContext} from '../../context/UsernameContext'
import './index.css'

const NotFound = () => {
  const {username} = useContext(UsernameContext)

  return (
    <div className="not-found">
      <div className="not-found-card">
        <h2>User Not Found</h2>
        {username ? (
          <p>
            No GitHub user found for <strong>@{username}</strong>. Please enter
            a valid username.
          </p>
        ) : (
          <p>Please enter a GitHub username to view the profile.</p>
        )}
      </div>
    </div>
  )
}

export default NotFound
