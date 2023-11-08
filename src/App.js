import { ApolloClient, InMemoryCache, ApolloProvider, useMutation, } from '@apollo/client';

import Form from './Form';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://13.127.32.89:4006/graphql', // Replace with your GraphQL API endpoint

});




function App() {
  return (
    <ApolloProvider client={client}>
      <Form />
    </ApolloProvider>
    // <>
    //   <Form />
    // </>
  );
}

export default App;
