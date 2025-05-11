import React, {useState} from 'react'
import './index.css'

const FruitsCounter = () => {
  // Initialize mango and banana counts
  const [mangoCount, setMangoCount] = useState(0)
  const [bananaCount, setBananaCount] = useState(0)

  // Increment mango count
  const eatMango = () => {
    setMangoCount(prevCount => prevCount + 1)
  }

  // Increment banana count
  const eatBanana = () => {
    setBananaCount(prevCount => prevCount + 1)
  }

  return (
    <div className="counter-container">
      <h1 className="counter-heading">
        Bob ate <span className="fruit-count">{mangoCount}</span> mangoes and{' '}
        <span className="fruit-count">{bananaCount}</span> bananas
      </h1>
      <div className="fruits-container">
        <div className="fruit-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/mango-img.png"
            alt="mango"
            className="fruit-img"
          />
          <button className="btn" onClick={eatMango}>
            Eat Mango
          </button>
        </div>
        <div className="fruit-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/banana-img.png"
            alt="banana"
            className="fruit-img"
          />
          <button className="btn" onClick={eatBanana}>
            Eat Banana
          </button>
        </div>
      </div>
    </div>
  )
}

export default FruitsCounter
