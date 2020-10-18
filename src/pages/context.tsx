import {ReactNode} from 'react'
import ApolloClient from 'apollo-client'
import {Store} from 'redux'
import {Provider} from 'react-redux'
import {ApolloProvider} from 'react-apollo'
import {ThemeProvider} from 'styled-components'
import theme from '@/config/theme'

export type ContextProps<T, S> = {
  children: ReactNode
  apolloClient: ApolloClient<T>
  store: Store<S>
}

export function ContextProvider<T, S>({
  children,
  apolloClient,
  store
}: ContextProps<T, S>): JSX.Element {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}> {children} </ThemeProvider>
      </ApolloProvider>
    </Provider>
  )
}
