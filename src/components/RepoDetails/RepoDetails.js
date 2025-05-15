import React from 'react';
import './RepoDetails.css';

const RepoDetails = ({ repo }) => {
  return (
    <div className="repoDetails__container">
      <h2 className="repoDetails__title">{repo.name}</h2>
      <p className="repoDetails__description">{repo.description || 'No description available'}</p>
      <div className="repoDetails__info">
        <span className="repoDetails__infoItem">
          <strong>Language:</strong> {repo.language || 'N/A'}
        </span>
        <span className="repoDetails__infoItem">
          <strong>Forks:</strong> {repo.forks_count}
        </span>
        <span className="repoDetails__infoItem">
          <strong>Stars:</strong> {repo.stargazers_count}
        </span>
      </div>
    </div>
  );
};

export default RepoDetails;
