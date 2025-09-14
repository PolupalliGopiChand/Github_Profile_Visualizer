import React, {useState, useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import UsernameContext from './context/UsernameContext'
import Home from './pages/Home'
import Repositories from './pages/Repositories'
import RepositoryDetails from './pages/RepositoryDetails'
import Analysis from './pages/Analysis'
import PageNotFound from './components/common/PageNotFound'
import {ROUTES} from './utils/constants'
import './App.css'

const App = () => {
  const [username, setUsername] = useState(
    () => localStorage.getItem('githubUsername') || '',
  )

  const changeUserName = newUsername => {
    setUsername(newUsername)
    // Persist to localStorage
    if (newUsername) {
      localStorage.setItem('githubUsername', newUsername)
    } else {
      localStorage.removeItem('githubUsername')
    }
  }

  return (
    <UsernameContext.Provider value={{username, changeUserName}}>
      <div className="appContainer">
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.REPOSITORIES} component={Repositories} />
          <Route
            exact
            path={`${ROUTES.REPOSITORIES}/:repoName`}
            component={RepositoryDetails}
          />
          <Route exact path={ROUTES.ANALYSIS} component={Analysis} />
          <Route exact path={ROUTES.NOT_FOUND} component={PageNotFound} />
          <Redirect to={ROUTES.NOT_FOUND} />
        </Switch>
      </div>
    </UsernameContext.Provider>
  )
}

export default App
