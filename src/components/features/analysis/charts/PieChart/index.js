import {
  PieChart as RechartsPieChart,
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

const PieChart = ({data}) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-no-data">
        <p>No data available for chart</p>
      </div>
    )
  }

  return (
    <div className="pie-chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({name, value}) => `${name}\n${value}`}
            outerRadius={70}
            innerRadius={30}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
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
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieChart
