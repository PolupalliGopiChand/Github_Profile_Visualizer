import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="header__container">
      <h1 className="header__title">
        <Link to="/" className="header__link">
          GitHub Profile Visualizer
        </Link>
      </h1>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li>
            <Link to="/" className="header__nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/repos" className="header__nav-link">
              Repositories
            </Link>
          </li>
          <li>
            <Link to="/contributors" className="header__nav-link">
              Contributors
            </Link>
          </li>
          <li>
            <Link to="/languages" className="header__nav-link">
              Languages
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
