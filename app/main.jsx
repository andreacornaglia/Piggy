'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'

import BarChart from './components/BarChart'
import LandingPage from './components/LandingPage'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav> 
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRedirect to="/barchart" />
        <Route path="/barchart" component={BarChart} />
        <Route path="/landing" component={LandingPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)