export const API_STATUS = {
  INITIAL: 'INITIAL',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  IN_PROGRESS: 'IN_PROGRESS',
}

export const GITHUB_API_BASE_URL =
  process.env.REACT_APP_GITHUB_API_BASE_URL || 'https://apis2.ccbp.in/gpv'
export const GITHUB_API_KEY = process.env.REACT_APP_GITHUB_API_KEY

export const ROUTES = {
  HOME: '/',
  REPOSITORIES: '/repositories',
  ANALYSIS: '/analysis',
  NOT_FOUND: '/not-found',
}

export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch data.',
  SOMETHING_WRONG: 'Something went wrong. Please try again later.',
  INVALID_USERNAME: 'Enter a valid GitHub username.',
}
