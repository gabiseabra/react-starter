import {Router} from 'react-router-dom'
import {ContextProvider} from '@/pages/context'
import Routes from '@/pages/routes'

export default function SSRApp({store, apolloClient, history}) {
  return (
    <ContextProvider store={store} apolloClient={apolloClient}>
      <Router history={history}>
        <Routes />
      </Router>
    </ContextProvider>
  )
}
