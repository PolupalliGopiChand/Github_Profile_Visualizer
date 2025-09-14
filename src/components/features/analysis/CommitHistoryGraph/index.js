import './index.css'

const CommitHistoryGraph = ({commitData}) => {
  if (!commitData || Object.keys(commitData).length === 0) {
    return (
      <div className="commit-history-container">
        <h3 className="commit-history-title">Commit History</h3>
        <div className="commit-history-no-data">
          <div className="no-data-icon">📊</div>
          <p>No commit history data available</p>
          <p className="no-data-subtitle">
            This user hasn&apos;t made any commits in the last 6 months
          </p>
        </div>
      </div>
    )
  }

  // Check if we have meaningful data (not just empty or zero values)
  const hasMeaningfulData = Object.values(commitData).some(val => val > 0)
  if (!hasMeaningfulData) {
    return (
      <div className="commit-history-container">
        <h3 className="commit-history-title">Commit History</h3>
        <div className="commit-history-no-data">
          <div className="no-data-icon">📊</div>
          <p>No commit activity found</p>
          <p className="no-data-subtitle">
            This user has no commit activity in the last 6 months
          </p>
        </div>
      </div>
    )
  }

  // Get the last 6 months
  const getLastSixMonths = () => {
    const months = []
    const currentDate = new Date()

    for (let i = 5; i >= 0; i -= 1) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1,
      )
      months.push({
        name: date.toLocaleDateString('en-US', {month: 'long'}),
        year: date.getFullYear(),
        month: date.getMonth(),
      })
    }

    return months
  }

  const months = getLastSixMonths()
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  // Process commit data to ensure we have data for all dates
  const processCommitData = () => {
    const processedData = {}

    // Initialize all dates with 0 commits
    months.forEach(month => {
      for (let week = 0; week < 5; week += 1) {
        daysOfWeek.forEach(day => {
          const key = `${month.name}-${day}-${week}`
          processedData[key] = 0
        })
      }
    })

    // Override with actual API data
    Object.entries(commitData).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(processedData, key)) {
        processedData[key] = value
      } else {
        // If we have data for a date that's not in our grid, add it
        processedData[key] = value
      }
    })

    return processedData
  }

  // Process the commit data to ensure we have data for all dates
  const processedCommitData = processCommitData()

  // Function to get commit intensity color
  const getCommitColor = commits => {
    if (commits === 0) return '#1e293b'
    if (commits <= 3) return '#0ea5e9'
    if (commits <= 6) return '#3b82f6'
    if (commits <= 9) return '#1d4ed8'
    return '#ffffff'
  }

  // Function to get commits for a specific date
  const getCommitsForDate = (month, dayOfWeek, weekOfMonth) => {
    // Use the processed data that ensures all dates have values
    const dateKey = `${month.name}-${dayOfWeek}-${weekOfMonth}`
    return processedCommitData[dateKey] || 0
  }

  return (
    <div className="commit-history-container">
      <h3 className="commit-history-title">Commit History of last 6 months</h3>
      <div className="commit-history-grid">
        {/* Days of week labels */}
        <div className="days-labels">
          {daysOfWeek.map(day => (
            <div key={day} className="day-label">
              {day}
            </div>
          ))}
        </div>

        {/* Month columns */}
        <div className="months-container">
          {months.map(month => (
            <div key={`${month.name}-${month.year}`} className="month-column">
              <div className="month-header">{month.name}</div>
              <div className="month-grid">
                {Array.from({length: 5}, (_, weekIndex) => (
                  <div key={weekIndex} className="week-row">
                    {daysOfWeek.map(day => {
                      const commits = getCommitsForDate(month, day, weekIndex)
                      return (
                        <div
                          key={`${month.name}-${day}-${weekIndex}`}
                          className="commit-day"
                          style={{
                            backgroundColor: getCommitColor(commits),
                            border: commits > 0 ? '1px solid #475569' : 'none',
                          }}
                          title={`${day}, ${month.name} ${
                            weekIndex + 1
                          }: ${commits} commits`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Legend */}
      <div className="commit-legend">
        <h4 className="legend-title">Commit Intensity</h4>
        <div className="legend-grid">
          <div className="legend-item">
            <div
              className="legend-color"
              style={{backgroundColor: '#1e293b'}}
            />
            <span>No commits</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{backgroundColor: '#0ea5e9'}}
            />
            <span>1-3 commits</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{backgroundColor: '#3b82f6'}}
            />
            <span>4-6 commits</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{backgroundColor: '#1d4ed8'}}
            />
            <span>7-9 commits</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{backgroundColor: '#ffffff'}}
            />
            <span>10+ commits</span>
          </div>
        </div>
      </div>

      {/* Commit Statistics */}
      <div className="commit-stats">
        <div className="stat-item">
          <div className="stat-number">
            {Object.values(processedCommitData).reduce(
              (sum, val) => sum + (val || 0),
              0,
            )}
          </div>
          <div className="stat-label">Total Commits</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">
            {Object.values(processedCommitData).filter(val => val > 0).length}
          </div>
          <div className="stat-label">Active Days</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">
            {Math.max(
              ...Object.values(processedCommitData).map(val => val || 0),
            )}
          </div>
          <div className="stat-label">Most Commits/Day</div>
        </div>
      </div>
    </div>
  )
}

export default CommitHistoryGraph
