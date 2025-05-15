import React from 'react';
import PropTypes from 'prop-types';
import './LanguageStats.css';

const LanguageStats = ({ languages }) => {
  return (
    <div className="languageStats__container">
      <h3 className="languageStats__title">Language Stats</h3>
      <div className="languageStats__list">
        {languages.map((language, index) => (
          <div key={index} className="languageStats__item">
            <span className="languageStats__name">{language.name}</span>
            <span className="languageStats__percentage">{language.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

LanguageStats.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LanguageStats;
