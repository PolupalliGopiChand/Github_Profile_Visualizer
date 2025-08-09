import {useState, useEffect, useContext} from 'react'
import {Bar, Pie} from 'react-chartjs-2'
import {Chart as ChartJS, registerables} from 'chart.js'
import {UsernameContext} from '../../context/UsernameContext'
import './index.css'

ChartJS.register(...registerables)

const Charts = () => {
  const {username} = useContext(UsernameContext)
  const [contributionData, setContributionData] = useState({
    labels: [],
    values: [],
  })
  const [languageData, setLanguageData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch user contributions (simplified, assuming aggregated data)
        const contribResponse = await fetch(
          `https://api.github.com/users/${username}/events`,
        )
        if (!contribResponse.ok)
          throw new Error('Failed to fetch contributions')
        const events = await contribResponse.json()
        // Aggregate contributions by month (simplified example)
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]
        const contribCounts = months.map(
          (_, i) =>
            events.filter(e => new Date(e.created_at).getMonth() === i).length,
        )
        setContributionData({labels: months, values: contribCounts})

        // Fetch repository languages
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos`,
        )
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories')
        const repos = await reposResponse.json()
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

    fetchData()
  }, [username])

  const contributionChartData = {
    labels: contributionData.labels,
    datasets: [
      {
        label: 'Contributions',
        data: contributionData.values,
        backgroundColor: 'rgba(36, 211, 117, 0.6)',
        borderColor: 'rgba(36, 211, 117, 1)',
        borderWidth: 1,
      },
    ],
  }

  const languageChartData = {
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
      },
    ],
  }

  if (loading) return <div className="chart-container">Loading charts...</div>
  if (error) return <div className="chart-container error">Error: {error}</div>

  return (
    <div className="charts">
      <div className="chart-container">
        <h3>Contribution Activity</h3>
        <Bar
          data={contributionChartData}
          options={{responsive: true, plugins: {legend: {position: 'top'}}}}
        />
      </div>
      <div className="chart-container">
        <h3>Language Distribution</h3>
        <Pie
          data={languageChartData}
          options={{responsive: true, plugins: {legend: {position: 'top'}}}}
        />
      </div>
    </div>
  )
}

export default Charts
