/**
 * Apollo client is a comprehensive state management library for JavaScript 
 * that enables you to manage both local and remote data with GraphQL. 
 * Use it to fetch, cache, and modify application data, 
 * all while automatically updating your UI.
 * 
 * Instructions:
 * 
 * 1. Create new react app `npx create-react-app graphql-client`
 * 
 * 2. cd graphql-client
 * 
 * 3. npm install @apollo/client graphql
 * 
 */

import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css";

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const query = gql`
  query {
    allPersons  {
      name,
      phone,
      address {
        street,
        city
      }
      id
    }
  }
`

client.query({ query }).then((response)=>{
  console.log(response.data)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)