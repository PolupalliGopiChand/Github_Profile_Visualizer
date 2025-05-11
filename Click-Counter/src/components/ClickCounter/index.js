import React, {useState} from 'react'
import './index.css'

const ClickCounter = () => {
  // State to store the counter value
  const [count, setCount] = useState(0)

  // Function to increment the counter
  const increment = () => setCount(prevCount => prevCount + 1)

  // Function to decrement the counter
  const decrement = () => setCount(prevCount => prevCount - 1)

  // Function to reset the counter
  const reset = () => setCount(0)

  return (
    <div className="counter-container">
      <h1 className="counter-title">Click Counter</h1>
      <p className="counter-display">Count: {count}</p>
      <div className="counter-buttons">
        <button className="btn increment" onClick={increment}>
          Increment
        </button>
        <button className="btn decrement" onClick={decrement}>
          Decrement
        </button>
        <button className="btn reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default ClickCounter
