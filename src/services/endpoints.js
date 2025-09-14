/* eslint-disable import/prefer-default-export */
import {GITHUB_API_KEY} from '../utils/constants'

export const ENDPOINTS = {
  PROFILE_DETAILS: username => `https://api.github.com/users/${username}`,

  PROFILE_SUMMARY: username =>
    `https://apis2.ccbp.in/gpv/profile-summary/${username}`,

  REPOSITORIES: username =>
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,

  REPOSITORY_DETAILS: (username, repoName) =>
    `https://api.github.com/repos/${username}/${repoName}`,

  REPOSITORY_CONTRIBUTORS: (username, repoName) =>
    `https://api.github.com/repos/${username}/${repoName}/contributors`,

  REPOSITORY_LANGUAGES: (username, repoName) =>
    `https://api.github.com/repos/${username}/${repoName}/languages`,

  COMMIT_HISTORY: username =>
    `https://api.github.com/users/${username}/events?per_page=100`,
}
