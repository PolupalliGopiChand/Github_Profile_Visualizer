// src/components/Home/Home.js
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useUsername} from '../../context/UsernameContext'
import './Home.css'

const Home = () => {
  const [input, setInput] = useState('')
  const {setUsername} = useUsername()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    if (input.trim() !== '') {
      setUsername(input.trim())
      navigate('/profile')
    }
  }

  return (
    <div className="home-container">
      <h1 className="home-heading">GitHub Profile Visualizer</h1>
      <form onSubmit={handleSubmit} className="home-form">
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="home-input"
        />
        <button type="submit" className="home-button">
          Visualize
        </button>
      </form>
    </div>
  )
}

export default Home
