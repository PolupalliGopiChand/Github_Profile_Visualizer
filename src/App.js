import {useContext, useState} from 'react'
import './App.css'
import {UsernameContext, UsernameProvider} from './context/UsernameContext'
import Header from './components/Header'
import Home from './components/Home'
import Charts from './components/Charts'
import Contributors from './components/Contributors'
import LanguageStats from './components/LanguageStats'
import NotFound from './components/NotFound'
import RepoDetails from './components/RepoDetails'
import RepoList from './components/RepoList'
import RepoStats from './components/RepoStats'

// Rest of the file remains unchanged
function App() {
  const {username} = useContext(UsernameContext)
  const [selectedRepo, setSelectedRepo] = useState(null)

  return (
    <UsernameProvider>
      <div className="app">
        <Header />
        {username ? (
          <main>
            <Home username={username} />
            <Charts />
            <LanguageStats />
            <RepoList onSelectRepo={setSelectedRepo} />
            <RepoDetails repoName={selectedRepo} />
            <RepoStats />
            <Contributors />
          </main>
        ) : (
          <NotFound />
        )}
      </div>
    </UsernameProvider>
  )
}

export default App
