import React, {useState} from 'react'
import './index.css'

const Speedometer = () => {
  // State to hold current speed
  const [speed, setSpeed] = useState(0)

  // Handler to increase speed by 10, up to a max of 200
  const handleAccelerate = () => {
    if (speed < 200) {
      setSpeed(prevSpeed => prevSpeed + 10)
    }
  }

  // Handler to decrease speed by 10, down to a min of 0
  const handleApplyBrake = () => {
    if (speed > 0) {
      setSpeed(prevSpeed => prevSpeed - 10)
    }
  }

  return (
    <div className="speedometer-container">
      <h1 className="title">Speedometer</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/speedometer-img.png"
        alt="speedometer"
        className="speedometer-img"
      />
      <h2 className="speed-label">Speed is {speed}mph</h2>
      <p className="limit-label">Min Limit is 0mph, Max Limit is 200mph</p>
      <div className="button-container">
        <button className="btn accelerate" onClick={handleAccelerate}>
          Accelerate
        </button>
        <button className="btn brake" onClick={handleApplyBrake}>
          Apply Brake
        </button>
      </div>
    </div>
  )
}

export default Speedometer
