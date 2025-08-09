import {useState, useEffect, useContext} from 'react'
import {Pie} from 'react-chartjs-2'
import {Chart as ChartJS, registerables} from 'chart.js'
import {UsernameContext} from '../../context/UsernameContext'
import './index.css'

ChartJS.register(...registerables)

const LanguageStats = () => {
  const {username} = useContext(UsernameContext)
  const [languageData, setLanguageData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const fetchLanguageData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`,
        )
        if (!response.ok) throw new Error('Failed to fetch repositories')
        const repos = await response.json()
        const languages = repos.reduce((acc, repo) => {
          if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1
          }
          return acc
        }, {})
        setLanguageData(languages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLanguageData()
  }, [username])

  const chartData = {
    labels: Object.keys(languageData),
    datasets: [
      {
        data: Object.values(languageData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  }

  if (loading)
    return (
      <div className="language-stats-container">Loading language stats...</div>
    )
  if (error)
    return <div className="language-stats-container error">Error: {error}</div>
  if (!Object.keys(languageData).length)
    return (
      <div className="language-stats-container">
        No language data available.
      </div>
    )

  return (
    <div className="language-stats">
      <h3>Language Statistics</h3>
      <div className="chart-container">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {position: 'top'},
              title: {display: true, text: 'Repository Language Distribution'},
            },
          }}
        />
      </div>
    </div>
  )
}

export default LanguageStats
