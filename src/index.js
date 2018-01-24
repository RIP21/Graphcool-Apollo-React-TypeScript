import * as React from 'react'
import { render } from 'react-dom'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import Login from './Login'
import Posts from './Posts'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cjckqtb9k4a570187cy41x9at',
  }),
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Login />
      <Posts />
    </div>
  </ApolloProvider>
)

render(<App />, document.getElementById('root'))
