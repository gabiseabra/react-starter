import {createMemoryHistory} from 'history'
import createStore from '@/redux/store'
import createApolloClient from '@/graphql/client'
import {getToken} from '@/lib/jwt'

/**
 * Initializes redux store and apollo client with jtw from cookies
 */
export default ({apolloClient = createApolloClient, store = createStore}) =>
  function reactContextMiddleware(req, res, next) {
    req.history = createMemoryHistory({
      initialEntries: [{pathname: req.url}],
      initialIndex: 0
    })
    req.jwt = getToken(req)
    req.apolloClient = apolloClient({
      getToken: () => req.jwt,
      history: req.history
    })
    req.store = store({
      apolloClient: req.apolloClient,
      history: req.history
    })
    next()
  }
