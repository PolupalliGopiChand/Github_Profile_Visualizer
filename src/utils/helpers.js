export const descendingSort = (a, b) => b.value - a.value

export const formatQuarterData = quarterCommitCount => {
  if (!quarterCommitCount || typeof quarterCommitCount !== 'object') {
    return []
  }

  const quarterCommitData = []
  const quarterCommitKeyNames = Object.keys(quarterCommitCount)

  quarterCommitKeyNames.forEach(keyName => {
    const value = quarterCommitCount[keyName]
    if (typeof value === 'number' && value >= 0) {
      quarterCommitData.push({
        name: keyName,
        commits: value,
      })
    }
  })

  return quarterCommitData
    .sort(descendingSort)
    .slice(0, Object.keys(quarterCommitCount).length)
}

export const formatLanguageData = languageCount => {
  if (!languageCount || typeof languageCount !== 'object') {
    return []
  }

  const languageData = []
  const languageKeyNames = Object.keys(languageCount)

  languageKeyNames.forEach(keyName => {
    const value = languageCount[keyName]
    if (typeof value === 'number' && value > 0) {
      languageData.push({
        name: keyName,
        value,
      })
    }
  })

  return languageData
}

export const validateUsername = username => username.trim() !== ''
