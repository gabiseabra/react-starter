import {loadableReady} from '@loadable/component'
import {createBrowserHistory} from 'history'
import ReactDOM from 'react-dom'
import initApollo from '@/graphql/client'
import createStore from '@/redux/store'
import App from './App'

window.__initialState = window.__initialState || {}

const root = document.getElementById('root')
const history = createBrowserHistory({})
let apolloClient = initApollo({}, window.__initialState.apollo)
let store = createStore({apolloClient, history}, window.__initialState.redux)

const AppWithContext = () => (
  <App store={store} apolloClient={apolloClient} history={history} />
)

loadableReady(() => ReactDOM.hydrate(<AppWithContext />, root))

if (module.hot) {
  module.hot.accept('../redux/store.js', () => {
    store = require('../redux/store').default(
      {apolloClient, history},
      window.__initialState
    )
    ReactDOM.render(<AppWithContext />, root)
  })
  module.hot.accept('../graphql/client', () => {
    apolloClient = require('../graphql/client').default({})
    ReactDOM.render(<AppWithContext />, root)
  })
  module.hot.accept(() => ReactDOM.render(<App />, root))
}
