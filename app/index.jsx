import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import reducers from './reducers'
import {request} from './middleware'
import Main from './Main'
import Store from './Store'
import ProductManagement from './ProductManagement'
import Config from './Manage/Config'
import Users from './Manage/Users'

injectTapEventPlugin()

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(request),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Main}>
        <Route path='store' component={Store} />
        <Route path='store/:basketId' component={Store} />
        <Route path='manage'>
          <Route path='products' component={ProductManagement} />
          <Route path='config' component={Config} />
          <Route path='users' component={Users} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
