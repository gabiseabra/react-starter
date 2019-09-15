import {applyMiddleware} from 'redux'
import createSagaMiddleware, {END} from 'redux-saga'
import {routerMiddleware} from 'connected-react-router'

import createReducer from './modules/reducer'
import createSaga from './modules/saga'

const compose = (...args) => {
  let compose
  if (
    process.env.NODE_MODULES == 'development' &&
    process.browser &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  )
    compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  else compose = require('redux').compose
  return compose(...args)
}

const createStore = (middleware) =>
  compose(applyMiddleware(...middleware))(require('redux').createStore)

function createMiddleware(context) {
  const middleware = new Map([])
  middleware.set('saga', createSagaMiddleware({context}))
  if (context.history)
    middleware.set('router', routerMiddleware(context.history))
  if (process.env.NODE_MODULES == 'development' && process.browser) {
    const {createLogger} = require('redux-logger')
    middleware.set('logger', createLogger({collapsed: true}))
  }
  return middleware
}

export default function createReduxStore(context, preloadedState = {}) {
  const saga = createSaga(context)
  const reducer = createReducer(context)
  const middleware = createMiddleware(context)

  const store = createStore(middleware.values())(reducer, preloadedState)

  // Redux saga helpers
  store.runSaga = (_) => {
    store.task = middleware.get('saga').run(_)
  }
  store.close = () => store.dispatch(END)
  store.runSaga(saga)

  // Hot module replacement
  if (module.hot) {
    module.hot.accept('./modules/reducer', () =>
      store.replaceReducer(require('./modules/reducer').default)
    )
    module.hot.accept('./modules/saga', () => {
      store.task.cancel()
      store.runSaga(require('./modules/saga').default)
    })
    module.hot.accept(() => {})
  }

  return store
}
