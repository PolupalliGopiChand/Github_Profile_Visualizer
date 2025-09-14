import {Link} from 'react-router-dom'
import {ROUTES} from '../../../utils/constants'
import './index.css'

const PageNotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dwirj6lej/image/upload/v1755750038/PageNotFoundViewImage_xzpgmp.png"
      alt="Page not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-message">
      The page you are looking for does not exist.
    </p>
    <Link to={ROUTES.HOME} className="back-home-link">
      Back to Home
    </Link>
  </div>
)

export default PageNotFound
