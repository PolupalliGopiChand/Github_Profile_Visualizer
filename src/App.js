import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import NotFound from './components/NotFound'
import RepoList from './components/RepoList'
import RepoDetails from './components/RepoDetails'
import RepoStats from './components/RepoStats'
import LanguageStats from './components/LanguageStats'
import Contributors from './components/Contributors'
import Charts from './components/Charts'

import './App.css'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/repos" component={RepoList} />
        <Route path="/repo/:repoId" component={RepoDetails} />
        <Route path="/repo-stats" component={RepoStats} />
        <Route path="/language-stats" component={LanguageStats} />
        <Route path="/contributors" component={Contributors} />
        <Route path="/charts" component={Charts} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
