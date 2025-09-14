import React, {useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import UsernameContext from '../../context/UsernameContext'
import useGitHubAPI from '../../hooks/useGitHubAPI'
import Header from '../../components/common/Header'
import LoadingSpinner from '../../components/common/Loader'
import ErrorView from '../../components/common/ErrorView'
import NoDataView from '../../components/common/NoDataView'
import NoDataFoundView from '../../components/common/NoDataFoundView'
import RepositoryCard from '../../components/features/repository/RepositoryCard'
import {API_STATUS} from '../../utils/constants'
import './index.css'

const Repositories = () => {
  const {username} = useContext(UsernameContext)
  const history = useHistory()
  const {
    apiStatus,
    errorMsg,
    data: repositories,
    fetchRepositories,
    resetState,
  } = useGitHubAPI()

  useEffect(() => {
    if (username === '') {
      return // Don't redirect, just show NoDataView
    }
    fetchRepositories(username)
  }, [username, fetchRepositories])

  const handleTryAgain = () => {
    resetState()
    fetchRepositories(username)
  }

  const renderRepositories = () => {
    if (!repositories || repositories.length === 0) {
      return <NoDataFoundView pageType="repositories" />
    }

    return (
      <div className="repositories-container">
        <h1 className="repositories-heading">Repositories</h1>
        <div className="repositories-list">
          {repositories.map(repo => (
            <RepositoryCard key={repo.id} repositoryDetails={repo} />
          ))}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    // Show NoDataView when no username is provided
    if (username === '') {
      return <NoDataView />
    }

    if (errorMsg) {
      return <ErrorView onRetry={handleTryAgain} />
    }

    if (apiStatus === API_STATUS.IN_PROGRESS) {
      return <LoadingSpinner />
    }

    return renderRepositories()
  }

  return (
    <>
      <Header />
      <div className="repositories-page">{renderContent()}</div>
    </>
  )
}

export default Repositories
