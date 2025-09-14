import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import './index.css'

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#f97316',
  '#84cc16',
]

const LanguagesChart = ({languages}) => {
  if (!languages || languages.length === 0) {
    return (
      <div className="languages-chart-no-data">
        <p>No language data available</p>
      </div>
    )
  }

  // Calculate total bytes for percentage calculation
  const totalBytes = languages.reduce((sum, lang) => sum + lang.value, 0)

  // Format data for the chart
  const chartData = languages.map(lang => ({
    name: lang.name,
    value: lang.value,
    percentage: ((lang.value / totalBytes) * 100).toFixed(1),
  }))

  return (
    <div className="languages-chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({name, percentage}) => `${name}\n${percentage}%`}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}-${entry.value}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#1e293b"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#ffffff',
            }}
            formatter={(value, name) => [value, name]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={value => (
              <span style={{color: '#ffffff', fontSize: '12px'}}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LanguagesChart
