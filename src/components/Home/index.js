import React, {useContext} from 'react'
import {UsernameContext} from '../../context/UsernameContext'
import './index.css'

const Home = ({onSearch}) => {
  const {username} = useContext(UsernameContext)

  const handleSubmit = e => {
    e.preventDefault()
    if (username) onSearch(username)
  }

  return (
    <section className="home">
      <h1 className="home-title">Explore GitHub Profiles</h1>
      <p className="home-subtitle">
        Visualize repositories, commits, languages, and contributors like never
        before.
      </p>
      <form className="home-form" onSubmit={handleSubmit}>
        <button type="submit" className="home-button">
          🔍 Analyze
        </button>
      </form>
    </section>
  )
}

export default Home
