import {useHistory} from 'react-router-dom'
import './index.css'

const NoDataView = () => {
  const history = useHistory()

  const handleGoToHome = () => {
    history.push('/')
  }

  return (
    <div className="no-data-container">
      <img
        src="https://res.cloudinary.com/dwirj6lej/image/upload/v1755750039/NoDataViewImage_gtdstz.png"
        alt="No data found"
        className="no-data-image"
      />
      <h1 className="no-data-heading">No Data Found</h1>
      <p className="no-data-message">
        GitHub Username is empty, please provide a valid username for
        Repositories
      </p>
      <button type="button" onClick={handleGoToHome} className="go-home-button">
        Go to Home
      </button>
    </div>
  )
}

export default NoDataView
