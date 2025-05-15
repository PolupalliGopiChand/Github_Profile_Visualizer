import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {UsernameProvider} from './context/UsernameContext'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import RepoList from './components/RepoList/RepoList'
import RepoDetails from './components/RepoDetails/RepoDetails'
import NotFound from './components/NotFound/NotFound'

import './App.css'

const App = () => (
  <UsernameProvider>
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repos" element={<RepoList />} />
          <Route path="/repositories" element={<RepoList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </UsernameProvider>
)

export default App
