import {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {ROUTES} from '../../../utils/constants'
import './index.css'

const Header = () => {
  const [activeStatus, setActiveStatus] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setActiveStatus(prev => !prev)
  }

  const isActiveRoute = path => location.pathname === path

  const NavLink = ({to, children, className, activeClassName}) => (
    <Link to={to} className={isActiveRoute(to) ? activeClassName : className}>
      {children}
    </Link>
  )

  return (
    <div className="container">
      <div data-testid="header" className="repo-item">
        <nav className="header-container">
          <Link to={ROUTES.HOME} className="heading-nav-link">
            <h1 className="header-heading">GitHub Profile Visualizer</h1>
          </Link>

          <button
            className="menu-button"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <img
              src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718691523/menu_l33xs7.png"
              alt="menu"
              className="menuSize"
            />
          </button>

          <ul className={`items-nav ${activeStatus ? 'active' : ''}`}>
            <li>
              <NavLink
                to={ROUTES.HOME}
                className="item-nav-link"
                activeClassName="active-link item-nav-link"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.REPOSITORIES}
                className="item-nav-link"
                activeClassName="active-link item-nav-link"
              >
                Repositories
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.ANALYSIS}
                className="item-nav-link"
                activeClassName="active-link item-nav-link"
              >
                Analysis
              </NavLink>
            </li>
          </ul>
        </nav>

        {activeStatus && (
          <nav>
            <ul className="nav-items-container active">
              <li>
                <NavLink
                  to={ROUTES.HOME}
                  className="item-link"
                  activeClassName="active-link item-link"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.REPOSITORIES}
                  className="item-link"
                  activeClassName="active-link item-link"
                >
                  Repositories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.ANALYSIS}
                  className="item-link"
                  activeClassName="active-link item-link"
                >
                  Analysis
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  )
}

export default Header
