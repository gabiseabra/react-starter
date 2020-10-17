import { ReactNode } from 'react';
import ApolloClient from 'apollo-client';
import { Store } from 'redux';
export declare type ContextProps<T, S> = {
  apolloClient: ApolloClient<T>;
  store: Store<S>;
  children: ReactNode;
};
export declare function ContextProvider<T, S>({ children, apolloClient, store }: ContextProps<T, S>): JSX.Element;
