'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'

import BarChart from './components/BarChart'
import LandingPage from './components/LandingPage'
import Expenses from './components/Expenses'
import Breakdown from './components/Breakdown'
import {fetchTotalData} from './reducers/total'
import {fetchCoffeeData} from './reducers/coffee'

const onCoffeeEnter = nextRouterState => {
  store.dispatch(fetchCoffeeData(nextRouterState.params.category))
}

const onTotalEnter = nextRouterState => {
  store.dispatch(fetchTotalData())
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRedirect to="/landing" />
        <Route path="/landing" component={LandingPage} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/barchart/:category" component={BarChart} onEnter={onCoffeeEnter} />
        <Route path="/breakdown/" component={Breakdown} onEnter={onTotalEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)