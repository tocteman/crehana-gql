import React from 'react';
import Main from './Main'
import "../src/assets/css/styles.css";
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Details from "./components/Details"
import { RecoilRoot } from "recoil";


const httpLink = createHttpLink({
  uri: 'https://api.graphql.jobs/',
  fetch   
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: httpLink
});


function App() {


  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <div className="font-body flex">
          <Main></Main>
          <Details></Details>
        </div>
        </ApolloProvider>
    </RecoilRoot>
  );
}

export default App;
