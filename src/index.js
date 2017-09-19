/* eslint-env node */

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, browserHistory} from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes';
import * as Cookies from "js-cookie";

import reducer from './reducers'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
const history = syncHistoryWithStore(browserHistory, store)

const token = Cookies.get('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

render(<Provider store={store}>
         <Router history={history} routes={routes}/>
       </Provider>,
       document.getElementById('app'))

// render(<Provider store={store}>
//          <Router history={history} routes={routes}>
//            <Route path="/" component={Application}/>
//            <Router path="/about" component={About}/>
//          </Router>
//        </Provider>,
//        document.getElementById('app'))

// if (module.hot) {
//   module.hot.accept('./Application', () => {
//     const NextApplication = require('./Application').default
//     const NextAbout = require('./About').default
//     render(<Provider store={store}>
//              <Router history={history}>
//                <Route path="/" component={NextApplication}/>
//                <Router path="/about" component={NextAbout}/>
//              </Router>
//            </Provider>,
//            document.getElementById('app'))
//   })
// }
