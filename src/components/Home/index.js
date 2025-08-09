import {useState, useEffect, useContext} from 'react'
import {UsernameContext} from '../../context/UsernameContext'
import './index.css'

const Home = () => {
  const {username} = useContext(UsernameContext)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const fetchUserData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (!response.ok) throw new Error('Failed to fetch user data')
        const data = await response.json()
        setUserData({
          login: data.login,
          name: data.name,
          avatar_url: data.avatar_url,
          bio: data.bio,
          followers: data.followers,
          following: data.following,
          public_repos: data.public_repos,
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [username])

  if (loading) return <div className="home-container">Loading profile...</div>
  if (error) return <div className="home-container error">Error: {error}</div>
  if (!userData)
    return <div className="home-container">No user data available.</div>

  return (
    <div className="home">
      <div className="profile-card">
        <img
          src={userData.avatar_url}
          alt={`${userData.login}'s avatar`}
          className="profile-avatar"
        />
        <h2>{userData.name || userData.login}</h2>
        <p className="username">@{userData.login}</p>
        {userData.bio && <p className="bio">{userData.bio}</p>}
        <div className="stats">
          <p>
            <strong>Followers:</strong> {userData.followers}
          </p>
          <p>
            <strong>Following:</strong> {userData.following}
          </p>
          <p>
            <strong>Public Repos:</strong> {userData.public_repos}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
