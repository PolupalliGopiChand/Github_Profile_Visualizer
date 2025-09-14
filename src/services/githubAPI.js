import {ENDPOINTS} from './endpoints'
import {ERROR_MESSAGES} from '../utils/constants'

const createGitHubAPI = () => {
  const fetchData = async url => {
    try {
      const headers = {
        Accept: 'application/vnd.github.v3+json',
      }

      const response = await fetch(url, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            'User not found. Please check the username and try again.',
          )
        }
        if (response.status === 403) {
          throw new Error('Rate limit exceeded. Please try again later.')
        }
        if (response.status === 429) {
          throw new Error('Too many requests. Please try again later.')
        }
        throw new Error(ERROR_MESSAGES.FETCH_FAILED)
      }

      return response.json()
    } catch (error) {
      throw new Error(error.message || ERROR_MESSAGES.SOMETHING_WRONG)
    }
  }

  const getProfileDetails = async username => {
    const url = ENDPOINTS.PROFILE_DETAILS(username)
    const data = await fetchData(url)

    return {
      avatarUrl: data.avatar_url,
      bio: data.bio,
      blog: data.blog,
      company: data.company,
      createdAt: data.created_at,
      email: data.email,
      eventsUrl: data.events_url,
      followers: data.followers,
      followersUrl: data.followers_url,
      following: data.following,
      followingUrl: data.following_url,
      gistsUrl: data.gists_url,
      gravatarId: data.gravatar_id,
      hireable: data.hireable,
      htmlUrl: data.html_url,
      id: data.id,
      location: data.location,
      login: data.login,
      name: data.name,
      nodeId: data.node_id,
      organizationsUrl: data.organizations_url,
      publicGists: data.public_gists,
      publicRepos: data.public_repos,
      receivedEventsUrl: data.received_events_url,
      reposUrl: data.repos_url,
      siteAdmin: data.site_admin,
      starredUrl: data.starred_url,
      subscriptionsUrl: data.subscriptions_url,
      twitterUsername: data.twitter_username,
      type: data.type,
      updatedAt: data.updated_at,
      url: data.url,
    }
  }

  const getProfileSummary = async username => {
    const url = ENDPOINTS.PROFILE_SUMMARY(username)
    const summaryData = await fetchData(url)

    // Return the data directly from the API response
    return summaryData
  }

  const getRepositories = async username => {
    const url = ENDPOINTS.REPOSITORIES(username)
    const repos = await fetchData(url)

    // Fetch languages for each repository
    const reposWithLanguages = await Promise.all(
      repos.map(async repo => {
        try {
          const languages = await fetchData(
            ENDPOINTS.REPOSITORY_LANGUAGES(username, repo.name),
          )
          const formattedLanguages = Object.entries(languages).map(
            ([name, value]) => ({
              name,
              value,
            }),
          )

          return {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            stargazersCount: repo.stargazers_count,
            forksCount: repo.forks_count,
            owner: {
              avatarUrl: repo.owner.avatar_url,
              login: repo.owner.login,
            },
            languages: formattedLanguages,
          }
        } catch (error) {
          console.error(`Error fetching languages for ${repo.name}:`, error)
          return {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            stargazersCount: repo.stargazers_count,
            forksCount: repo.forks_count,
            owner: {
              avatarUrl: repo.owner.avatar_url,
              login: repo.owner.login,
            },
            languages: [],
          }
        }
      }),
    )

    return reposWithLanguages
  }

  const getRepositoryDetails = async (username, repoName) => {
    const [repoData, contributors, languages] = await Promise.all([
      fetchData(ENDPOINTS.REPOSITORY_DETAILS(username, repoName)),
      fetchData(ENDPOINTS.REPOSITORY_CONTRIBUTORS(username, repoName)),
      fetchData(ENDPOINTS.REPOSITORY_LANGUAGES(username, repoName)),
    ])

    return {
      name: repoData.name,
      description: repoData.description,
      stargazersCount: repoData.stargazers_count,
      forksCount: repoData.forks_count,
      defaultBranch: repoData.default_branch,
      openIssuesCount: repoData.open_issues_count,
      updatedAt: repoData.updated_at,
      htmlUrl: repoData.html_url,
      owner: {
        avatarUrl: repoData.owner.avatar_url,
        login: repoData.owner.login,
      },
      contributors: contributors.map(contributor => ({
        id: contributor.id,
        login: contributor.login,
        avatarUrl: contributor.avatar_url,
        contributions: contributor.contributions,
      })),
      languages: Object.entries(languages).map(([name, value]) => ({
        name,
        value,
      })),
    }
  }

  const getCommitHistory = async username => {
    try {
      const events = await fetchData(ENDPOINTS.COMMIT_HISTORY(username))

      // Filter for push events (commits) and get the last 6 months
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

      const commitEvents = events.filter(
        event =>
          event.type === 'PushEvent' &&
          new Date(event.created_at) >= sixMonthsAgo,
      )

      // Group commits by date
      const commitHistory = {}
      commitEvents.forEach(event => {
        const date = new Date(event.created_at)
        const month = date.toLocaleDateString('en-US', {month: 'long'})
        const dayOfWeek = date.toLocaleDateString('en-US', {weekday: 'long'})
        const weekOfMonth = Math.floor((date.getDate() - 1) / 7)

        const key = `${month}-${dayOfWeek}-${weekOfMonth}`
        commitHistory[key] = (commitHistory[key] || 0) + 1
      })

      return commitHistory
    } catch (error) {
      console.error('Error fetching commit history:', error)
      return {}
    }
  }

  return {
    getProfileDetails,
    getProfileSummary,
    getRepositories,
    getRepositoryDetails,
    getCommitHistory,
  }
}

export default createGitHubAPI()
