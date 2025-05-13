import React, {useContext} from 'react'
import {UsernameContext} from '../../context/UsernameContext'
import './index.css'

const Header = () => {
  const {username, setUsername} = useContext(UsernameContext)

  const handleChange = e => {
    setUsername(e.target.value.trim())
  }

  return (
    <header className="header">
      <div className="logo">GitHub Visualizer 🚀</div>
      <input
        type="text"
        className="username-input"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={handleChange}
      />
    </header>
  )
}

export default Header
