import { Component } from 'react';
import './index.css';

class RandomNumberGenerator extends Component {
  state = { num: 0 };

  generateNum = () => {
    const randomNum = Math.floor(Math.random() * 101);
    this.setState({ num: randomNum });
  };

  render() {
    const { num } = this.state;
    return (
      <div className="container">
        <div className="card">
          <h1>Random Number</h1>
          <p>Generate a random number in the range of 0 to 100</p>
          <button onClick={this.generateNum}>Generate</button>
          <p className="output">{num}</p>
        </div>
      </div>
    );
  }
}

export default RandomNumberGenerator;
