import React from 'react'
import {PieChart, Pie, Tooltip, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#845EC2',
  '#D65DB1',
]

const Charts = ({data, title}) => (
  <div className="charts-container">
    <h3 className="charts-title">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map(entry => (
            <Cell
              key={entry.name}
              fill={
                entry.color || COLORS[Math.floor(Math.random() * COLORS.length)]
              }
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
)

export default Charts
