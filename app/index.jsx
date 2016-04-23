import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import reducers from './reducers'
import Main from './Main'
import Sell from './Sell'
import Maze from './Maze'
injectTapEventPlugin()

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Main}>
        <Route path='sell' component={Sell}/>
        <Route path='maze' component={Maze}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
