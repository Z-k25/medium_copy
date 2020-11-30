import React from 'react'
import {Switch, Route} from 'react-router-dom'

import GlobalFeed from './pages/globalFeed/index'
import Article from './pages/article'
import Authentication from './pages/authentication'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/articles/:slug" component={Article} />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
    </Switch>
  )
}
export default Routes
