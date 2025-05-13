import React from 'react'
import './index.css'

const LanguageStats = ({languageData}) => {
  if (!languageData || languageData.length === 0) {
    return <p className="language-stats-empty">No language data available.</p>
  }

  return (
    <section className="language-stats">
      <h2 className="language-stats-title">Language Usage</h2>
      <ul className="language-list">
        {languageData.map(lang => (
          <li key={lang.language} className="language-item">
            <span
              className="language-color"
              style={{backgroundColor: lang.color || '#888'}}
            />
            <span className="language-name">{lang.language}</span>
            <span className="language-percent">{lang.percentage}%</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LanguageStats
