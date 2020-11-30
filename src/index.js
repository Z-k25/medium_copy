import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './App/routes'
import TopBar from './App/components/topBar'
import { CurrentUserProvider } from './App/contexts/currentUser'
import CurrentUserChecker from './App/components/currentUserChecker'
const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
