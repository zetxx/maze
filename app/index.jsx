import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, Redirect } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import reducers from './reducers'
import {request} from './middlewares'
import Root from './Main'
import Sell from './Sell'
import Maze from './Maze'
injectTapEventPlugin()

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(request)
)
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Redirect from='/' to='maze' />
      <Route path='/' component={Root}>
        <Route path='sell' component={Sell} />
        <Route path='maze' component={Maze} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
