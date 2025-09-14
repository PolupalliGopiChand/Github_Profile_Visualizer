import React, {useContext, useState, useEffect} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {RiBuildingLine} from 'react-icons/ri'
import {IoLocationOutline} from 'react-icons/io5'
import {IoMdLink} from 'react-icons/io'
import UsernameContext from '../../context/UsernameContext'
import useGitHubAPI from '../../hooks/useGitHubAPI'
import Header from '../../components/common/Header'
import LoadingSpinner from '../../components/common/Loader'
import ErrorView from '../../components/common/ErrorView'
import HomeLandingPage from '../../components/features/HomeLandingPage'
import {API_STATUS, ERROR_MESSAGES} from '../../utils/constants'
import './index.css'

const Home = () => {
  const {username, changeUserName} = useContext(UsernameContext)
  const [validationError, setValidationError] = useState('')
  const {
    apiStatus,
    errorMsg,
    data: profileDetails,
    fetchProfileDetails,
    resetState,
  } = useGitHubAPI()

  // Removed automatic search - search only happens on user interaction

  const handleSearch = () => {
    // Clear previous validation errors
    setValidationError('')

    if (username.trim() === '') {
      setValidationError(ERROR_MESSAGES.INVALID_USERNAME)
      resetState()
      return
    }

    // Basic username validation (GitHub usernames are alphanumeric with hyphens)
    const usernameRegex = /^[a-zA-Z0-9-]+$/
    if (!usernameRegex.test(username.trim())) {
      setValidationError(
        'Username can only contain letters, numbers, and hyphens.',
      )
      resetState()
      return
    }

    fetchProfileDetails(username)
  }

  const handleTryAgain = () => {
    resetState()
    setValidationError('')
    changeUserName('')
  }

  const handleUsernameChange = event => {
    setValidationError('') // Clear validation error when user types
    changeUserName(event.target.value)
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const renderProfileDetails = () => {
    if (!profileDetails || profileDetails.length === 0) return null

    const profile = profileDetails[0]
    const {
      avatarUrl,
      name,
      login,
      bio,
      blog,
      followers,
      following,
      publicRepos,
      company,
      location,
      organizationsUrl,
    } = profile

    return (
      <div data-testid="repoItem" className="repo-item">
        <div className="profileDetailsContainer">
          <img src={avatarUrl} alt={name} className="avatar-url" />
          <p className="login">{login}</p>
          <h1 className="name">{name}</h1>
          <p className="bio">BIO</p>
          <p className="bio">{bio}</p>
          <p className="bio">Blog</p>
          <p className="bio">{blog}</p>

          <div className="followers-following-public-container">
            <div className="followers-container">
              <p className="followers">{followers}</p>
              <p className="followers-heading">FOLLOWERS</p>
            </div>
            <hr className="hor-line" />
            <div className="following-container">
              <p className="followers">{following}</p>
              <p className="followers-heading">FOLLOWING</p>
            </div>
            <hr className="hor-line" />
            <div className="pubic-repos-container">
              <p className="followers">{publicRepos}</p>
              <p className="followers-heading">PUBLIC REPOS</p>
            </div>
          </div>

          <div className="bottom-container">
            <div className="company-container">
              <p className="company-heading">Company</p>
              <div className="companyUrl">
                <RiBuildingLine className="icon-style" />
                <p className="company">{company}</p>
              </div>
            </div>
            <div className="company-container">
              <p className="company-heading">Location</p>
              <div className="companyUrl">
                <IoLocationOutline className="icon-style" />
                <p className="company">{location}</p>
              </div>
            </div>
            <div className="company-container">
              <h1 className="company-heading">Company Url</h1>
              <div className="companyUrl">
                <IoMdLink className="icon-style" />
                <a href={organizationsUrl} className="company">
                  {organizationsUrl}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    // Show validation error first
    if (validationError) {
      return (
        <div className="validation-error-container">
          <p className="inputErrorMsg">{validationError}</p>
          <HomeLandingPage />
        </div>
      )
    }

    // Show API error
    if (errorMsg) {
      return (
        <>
          <p className="inputErrorMsg">{errorMsg}</p>
          <ErrorView onRetry={handleTryAgain} />
        </>
      )
    }

    if (apiStatus === API_STATUS.IN_PROGRESS) {
      return <LoadingSpinner />
    }

    if (!profileDetails || profileDetails.length === 0) {
      return <HomeLandingPage />
    }

    return renderProfileDetails()
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="input-container">
          <input
            type="search"
            value={username}
            onChange={handleUsernameChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter GitHub username"
            className="input-search-style"
          />
          <div className="search-icon-container">
            <button
              type="button"
              onClick={handleSearch}
              className="search-button"
              data-testid="searchButton"
              aria-label="Search GitHub username"
            >
              <HiOutlineSearch className="search-icon" />
            </button>
          </div>
        </div>
        {renderContent()}
      </div>
    </>
  )
}

export default Home
