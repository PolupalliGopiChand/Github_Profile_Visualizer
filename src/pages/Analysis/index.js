import React, {useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import UsernameContext from '../../context/UsernameContext'
import useGitHubAPI from '../../hooks/useGitHubAPI'
import Header from '../../components/common/Header'
import LoadingSpinner from '../../components/common/Loader'
import ErrorView from '../../components/common/ErrorView'
import NoDataView from '../../components/common/NoDataView'
import NoDataFoundView from '../../components/common/NoDataFoundView'
import LinearChart from '../../components/features/analysis/charts/LinearChart'
import LangRepoCountPie from '../../components/features/analysis/charts/LangRepoCountPie'
import LangCommitCountPie from '../../components/features/analysis/charts/LangCommitCountPie'
import RepoCommitCountPie from '../../components/features/analysis/charts/RepoCommitCountPie'
import RepoCommitCountDescription from '../../components/features/analysis/RepoCommitCountDescription'
import CommitHistoryGraph from '../../components/features/analysis/CommitHistoryGraph'
import {API_STATUS} from '../../utils/constants'
import {formatQuarterData, formatLanguageData} from '../../utils/helpers'
import './index.css'

const Analysis = () => {
  const {username} = useContext(UsernameContext)
  const history = useHistory()
  const {
    apiStatus,
    errorMsg,
    data: analysisList,
    fetchProfileSummary,
    resetState,
  } = useGitHubAPI()

  const {
    apiStatus: commitHistoryStatus,
    errorMsg: commitHistoryError,
    data: commitHistoryData,
    fetchCommitHistory,
    resetState: resetCommitHistory,
  } = useGitHubAPI()

  useEffect(() => {
    if (username === '') {
      return // Don't redirect, just show NoDataView
    }
    fetchProfileSummary(username)
    fetchCommitHistory(username)
  }, [username, fetchProfileSummary, fetchCommitHistory])

  const handleTryAgain = () => {
    resetState()
    resetCommitHistory()
    fetchProfileSummary(username)
    fetchCommitHistory(username)
  }

  const renderAnalysisContent = () => {
    if (!analysisList || Object.keys(analysisList).length === 0) {
      return <NoDataFoundView pageType="analysis" />
    }

    // Handle different possible data structures from the API
    const {
      user = {},
      quarterCommitCount = {},
      langRepoCount = {},
      langCommitCount = {},
      repoCommitCount = {},
      repoCommitCountDescriptions = {},
    } = analysisList

    const {avatarUrl, login} = user

    // Check if user has any repositories or analysis data
    const hasRepositories =
      langRepoCount && Object.keys(langRepoCount).length > 0
    const hasCommitData =
      quarterCommitCount && Object.keys(quarterCommitCount).length > 0

    if (!hasRepositories || !hasCommitData) {
      return <NoDataFoundView pageType="analysis" />
    }

    // Ensure we have valid data before formatting
    if (!quarterCommitCount || Object.keys(quarterCommitCount).length === 0) {
      return <NoDataFoundView pageType="analysis" />
    }

    const quarterCommitData = formatQuarterData(quarterCommitCount)
    const langRepoData = formatLanguageData(langRepoCount)
    const langCommitData = formatLanguageData(langCommitCount)
    const repoCommitData = formatLanguageData(repoCommitCount)

    return (
      <div className="analysis-container">
        <div className="user-info">
          <img src={avatarUrl} alt={login} className="user-avatar" />
          <h2 className="username">{login}</h2>
        </div>

        <div className="line-chart-section">
          <div className="chart-item full-width">
            <h3 className="chart-title">Quarterly Commit Activity</h3>
            <LinearChart data={quarterCommitData} />
          </div>
        </div>

        <div className="charts-and-descriptions-section">
          <div className="charts-grid">
            <div className="chart-item">
              <h3 className="chart-title">Repositories per Language</h3>
              <LangRepoCountPie data={langRepoData} />
            </div>

            <div className="chart-item">
              <h3 className="chart-title">Commits per Language</h3>
              <LangCommitCountPie data={langCommitData} />
            </div>

            <div className="chart-item">
              <h3 className="chart-title">Commits per Repository</h3>
              <RepoCommitCountPie data={repoCommitData} />
            </div>
          </div>

          <div className="descriptions-section">
            <h3 className="section-title">Repository Commit Descriptions</h3>
            <RepoCommitCountDescription
              descriptions={repoCommitCountDescriptions}
            />
          </div>
        </div>

        <CommitHistoryGraph commitData={commitHistoryData} />
      </div>
    )
  }

  const renderContent = () => {
    // Show NoDataView when no username is provided
    if (username === '') {
      return <NoDataView />
    }

    if (errorMsg || commitHistoryError) {
      return <ErrorView onRetry={handleTryAgain} />
    }

    if (
      apiStatus === API_STATUS.IN_PROGRESS ||
      commitHistoryStatus === API_STATUS.IN_PROGRESS
    ) {
      return (
        <div className="loading-container">
          <LoadingSpinner />
          <p className="loading-text">Fetching GitHub analysis data...</p>
        </div>
      )
    }

    return renderAnalysisContent()
  }

  return (
    <>
      <Header />
      <div className="analysis-page">{renderContent()}</div>
    </>
  )
}

export default Analysis
