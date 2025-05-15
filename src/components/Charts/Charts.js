import React, {useContext} from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {UsernameContext} from '../../context/UsernameContext'
import './Charts.css'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#a83279',
]

const Charts = ({languageStats}) => {
  const {username} = useContext(UsernameContext)

  if (!languageStats || languageStats.length === 0) {
    return (
      <p className="charts__no-data">
        No language stats available for {username}.
      </p>
    )
  }

  return (
    <div className="charts__container">
      <h2 className="charts__title">Language Usage Statistics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={languageStats}
            dataKey="value"
            nameKey="language"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {languageStats.map((entry, index) => (
              <Cell key={entry.language} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Charts
