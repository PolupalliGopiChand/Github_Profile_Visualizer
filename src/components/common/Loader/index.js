import {TailSpin} from 'react-loader-spinner'
import './index.css'

const LoadingSpinner = () => (
  <div className="loader-container" data-testid="loader">
    <TailSpin color="#3B82F6" height={50} width={50} />
  </div>
)

export default LoadingSpinner
