import {Component} from 'react'

import './index.css'

class ClickCounter extends Component {
  state = {count: 0}
  clicked = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  render() {
    const {count} = this.state
    return (
      <div className="container">
        <div>
          <h1>
            The Button has been clicked <br />
            <span>{count}</span> times
          </h1>
          <p>Click the button to increase the count!</p>
          <button type="button" onClick={this.clicked}>
            Click Me
          </button>
        </div>
      </div>
    )
  }
}

export default ClickCounter
