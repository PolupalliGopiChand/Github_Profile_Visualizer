import React from 'react'
import {useHistory} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  const history = useHistory()

  const handleGoHome = () => {
    history.push('/')
  }

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button type="button" onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  )
}

export default NotFound
