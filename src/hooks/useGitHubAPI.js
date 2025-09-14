import {useState, useCallback} from 'react'
import {API_STATUS, ERROR_MESSAGES} from '../utils/constants'
import {validateUsername} from '../utils/helpers'
import githubAPI from '../services/githubAPI'

const useGitHubAPI = () => {
  const [apiStatus, setApiStatus] = useState(API_STATUS.INITIAL)
  const [errorMsg, setErrorMsg] = useState('')
  const [data, setData] = useState(null)

  const resetState = useCallback(() => {
    setApiStatus(API_STATUS.INITIAL)
    setErrorMsg('')
    setData(null)
  }, [])

  const setError = useCallback(message => {
    setApiStatus(API_STATUS.FAILURE)
    setErrorMsg(message)
    setData(null)
  }, [])

  const setSuccess = useCallback(responseData => {
    setApiStatus(API_STATUS.SUCCESS)
    setData(responseData)
    setErrorMsg('')
  }, [])

  const setLoading = useCallback(() => {
    setApiStatus(API_STATUS.IN_PROGRESS)
    setErrorMsg('')
  }, [])

  const fetchProfileDetails = useCallback(
    async username => {
      if (!validateUsername(username)) {
        setError(ERROR_MESSAGES.INVALID_USERNAME)
        return
      }

      setLoading()

      try {
        const profileData = await githubAPI.getProfileDetails(username)
        setSuccess([profileData])
      } catch (error) {
        setError(error.message)
      }
    },
    [setError, setSuccess, setLoading],
  )

  const fetchProfileSummary = useCallback(
    async username => {
      if (!validateUsername(username)) {
        setError(ERROR_MESSAGES.INVALID_USERNAME)
        return
      }

      setLoading()

      try {
        const summaryData = await githubAPI.getProfileSummary(username)
        setSuccess(summaryData)
      } catch (error) {
        setError(error.message)
      }
    },
    [setError, setSuccess, setLoading],
  )

  const fetchRepositories = useCallback(
    async username => {
      if (!validateUsername(username)) {
        setError(ERROR_MESSAGES.INVALID_USERNAME)
        return
      }

      setLoading()

      try {
        const reposData = await githubAPI.getRepositories(username)
        setSuccess(reposData)
      } catch (error) {
        setError(error.message)
      }
    },
    [setError, setSuccess, setLoading],
  )

  const fetchRepositoryDetails = useCallback(
    async (username, repoName) => {
      if (!validateUsername(username)) {
        setError(ERROR_MESSAGES.INVALID_USERNAME)
        return
      }

      setLoading()

      try {
        const repoData = await githubAPI.getRepositoryDetails(
          username,
          repoName,
        )
        setSuccess(repoData)
      } catch (error) {
        setError(error.message)
      }
    },
    [setError, setSuccess, setLoading],
  )

  const fetchCommitHistory = useCallback(
    async username => {
      if (!validateUsername(username)) {
        setError(ERROR_MESSAGES.INVALID_USERNAME)
        return
      }

      setLoading()

      try {
        const commitData = await githubAPI.getCommitHistory(username)
        setSuccess(commitData)
      } catch (error) {
        setError(error.message)
      }
    },
    [setError, setSuccess, setLoading],
  )

  return {
    apiStatus,
    errorMsg,
    data,
    resetState,
    fetchProfileDetails,
    fetchProfileSummary,
    fetchRepositories,
    fetchRepositoryDetails,
    fetchCommitHistory,
  }
}

export default useGitHubAPI
