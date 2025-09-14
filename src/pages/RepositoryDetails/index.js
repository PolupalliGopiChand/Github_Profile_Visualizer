import React, {useContext, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {IoArrowBack} from 'react-icons/io5'
import UsernameContext from '../../context/UsernameContext'
import useGitHubAPI from '../../hooks/useGitHubAPI'
import Header from '../../components/common/Header'
import LoadingSpinner from '../../components/common/Loader'
import ErrorView from '../../components/common/ErrorView'
import Contributors from '../../components/features/repository/Contributors'
import Languages from '../../components/features/repository/Languages'
import LanguagesChart from '../../components/features/repository/LanguagesChart'
import {API_STATUS} from '../../utils/constants'
import './index.css'

const RepositoryDetails = () => {
  const {username} = useContext(UsernameContext)
  const {repoName} = useParams()
  const history = useHistory()
  const {
    apiStatus,
    errorMsg,
    data: repositoryDetails,
    fetchRepositoryDetails,
    resetState,
  } = useGitHubAPI()

  useEffect(() => {
    if (username === '') {
      history.push('/')
    } else {
      fetchRepositoryDetails(username, repoName)
    }
  }, [username, repoName, history, fetchRepositoryDetails])

  const handleTryAgain = () => {
    resetState()
    fetchRepositoryDetails(username, repoName)
  }

  const renderRepositoryContent = () => {
    if (!repositoryDetails) return null

    const {
      name,
      description,
      languages,
      stargazersCount,
      forksCount,
      owner,
      contributors,
      defaultBranch,
      openIssuesCount,
      updatedAt,
      htmlUrl,
    } = repositoryDetails

    const {avatarUrl, login} = owner

    return (
      <div className="repository-details-container">
        <div className="back-button-container">
          <button
            type="button"
            onClick={() => history.push(`/repositories`)}
            className="back-button"
            aria-label="Go back to repositories"
          >
            <IoArrowBack className="back-icon" />
            <span>Back to Repositories</span>
          </button>
        </div>
        <div className="repository-header">
          <div className="repository-info">
            <h1 className="repository-name">{name}</h1>
            <p className="repository-description">{description}</p>
            <div className="repository-meta">
              <span className="meta-item">
                <strong>Owner:</strong> {login}
              </span>
              <span className="meta-item">
                <strong>Default Branch:</strong> {defaultBranch}
              </span>
              <span className="meta-item">
                <strong>Open Issues:</strong> {openIssuesCount}
              </span>
              <span className="meta-item">
                <strong>Last Updated:</strong>{' '}
                {new Date(updatedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="repository-stats">
              <div className="stat-item">
                <span className="stat-label">Stars</span>
                <span className="stat-value">{stargazersCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Forks</span>
                <span className="stat-value">{forksCount}</span>
              </div>
            </div>
            <a
              href={htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="view-on-github-btn"
            >
              View on GitHub
            </a>
          </div>
          <img src={avatarUrl} alt={login} className="owner-avatar" />
        </div>

        <div className="repository-content">
          <div className="languages-section">
            <h2 className="section-title">Languages</h2>
            <div className="languages-chart-wrapper">
              <LanguagesChart languages={languages} />
            </div>
            <div className="languages-list">
              {languages.map(language => (
                <Languages key={language.value} languageDetails={language} />
              ))}
            </div>
          </div>

          <div className="contributors-section">
            <h2 className="section-title">Contributors</h2>
            <Contributors contributors={contributors} />
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (errorMsg) {
      return <ErrorView onRetry={handleTryAgain} />
    }

    if (apiStatus === API_STATUS.IN_PROGRESS) {
      return <LoadingSpinner />
    }

    return renderRepositoryContent()
  }

  return (
    <>
      <Header />
      <div className="repository-details-page">{renderContent()}</div>
    </>
  )
}

export default RepositoryDetails
