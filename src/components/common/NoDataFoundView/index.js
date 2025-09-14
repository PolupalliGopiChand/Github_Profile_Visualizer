import {useHistory} from 'react-router-dom'
import './index.css'

const NoDataFoundView = ({pageType = 'repositories'}) => {
  const history = useHistory()

  const handleGoToHome = () => history.push('/')

  const getPageText = () => {
    if (pageType === 'analysis') {
      return 'No Analysis Found!'
    }
    return 'No Repositories Found!'
  }

  return (
    <div className="no-data-found-container">
      <img
        src="https://res.cloudinary.com/dwirj6lej/image/upload/v1755750038/NoDataFoundViewImage_v6c8fh.png"
        alt="No data found"
        className="no-data-found-image"
      />
      <h1 className="no-data-found-heading">{getPageText()}</h1>
      <p className="no-data-found-message">
        This user doesn&apos;t have any{' '}
        {pageType === 'analysis' ? 'analysis data' : 'public repositories'}{' '}
        available.
      </p>
      <button type="button" className="go-home-button" onClick={handleGoToHome}>
        Go to Home
      </button>
    </div>
  )
}

export default NoDataFoundView
