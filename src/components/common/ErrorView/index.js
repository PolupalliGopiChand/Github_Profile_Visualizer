import './index.css'

const ErrorView = ({
  message = 'Something went wrong. Please try again.',
  imageSrc = 'https://res.cloudinary.com/dwirj6lej/image/upload/v1755750038/ErrorViewImage_cbqb4b.png',
  onRetry,
  showRetryButton = true,
}) => (
  <div className="failureContainer">
    <img src={imageSrc} alt="error view" className="error-view" />
    <p className="errorName">{message}</p>
    {showRetryButton && onRetry && (
      <button className="tryButton" type="button" onClick={onRetry}>
        Try again
      </button>
    )}
  </div>
)

export default ErrorView
