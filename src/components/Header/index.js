import {useContext, useState} from 'react'
import {UsernameContext} from '../../context/UsernameContext'
import './index.css'

const Header = () => {
  const {setUsername} = useContext(UsernameContext)
  const [input, setInput] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (input.trim()) {
      setUsername(input.trim())
      setInput('') // Clear input after submission
    }
  }

  return (
    <header className="header">
      <h1>GitHub Profile Visualizer</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </header>
  )
}

export default Header
