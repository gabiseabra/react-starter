import {ConnectedRouter} from 'connected-react-router'
import {ContextProvider} from '@/pages/context'
import Routes from '@/pages/routes'

export default function App({store, apolloClient, history}) {
  return (
    <ContextProvider store={store} apolloClient={apolloClient}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </ContextProvider>
  )
}
