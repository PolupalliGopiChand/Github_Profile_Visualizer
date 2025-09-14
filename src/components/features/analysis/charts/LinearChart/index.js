import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const LinearChart = ({data}) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-no-data">
        <p>No data available for chart</p>
      </div>
    )
  }

  return (
    <div className="linear-chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{top: 20, right: 30, left: 20, bottom: 20}}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis
            dataKey="name"
            stroke="#64748b"
            fontSize={14}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={14}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#ffffff',
            }}
            cursor={{stroke: '#3b82f6', strokeWidth: 2}}
          />
          <Line
            type="monotone"
            dataKey="commits"
            stroke="#3b82f6"
            strokeWidth={4}
            dot={{fill: '#3b82f6', strokeWidth: 2, r: 6}}
            activeDot={{
              r: 8,
              stroke: '#3b82f6',
              strokeWidth: 2,
              fill: '#ffffff',
            }}
            animationDuration={1500}
            animationBegin={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LinearChart
