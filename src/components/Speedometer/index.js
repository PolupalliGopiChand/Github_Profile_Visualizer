import {Component} from 'react'
import './index.css'

class Speedometer extends Component {
  state = {count: 0}

  onClickAccelerate = () => {
    this.setState(prevState => {
      if (prevState.count < 200) {
        return {count: prevState.count + 10}
      }
      return prevState
    })
  }

  onClickBrake = () => {
    this.setState(prevState => {
      if (prevState.count > 0) {
        return {count: prevState.count - 10}
      }
      return prevState
    })
  }

  render() {
    const {count} = this.state
    return (
      <div className="container">
        <div>
          <h1>SPEEDOMETER</h1>
          <img
            className="speedometerImg"
            src="https://assets.ccbp.in/frontend/react-js/speedometer-img.png"
            alt="Speedometer"
          />
          <h2>Speed Is {count}mph</h2>
          <p>Min Limit is 0mph, Max Limit is 200mph</p>
          <div className="buttonContainer">
            <button
              className="btn btn1"
              type="button"
              onClick={this.onClickAccelerate}
            >
              Accelerate
            </button>
            <button
              className="btn btn2"
              type="button"
              onClick={this.onClickBrake}
            >
              Apply Brake
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Speedometer
