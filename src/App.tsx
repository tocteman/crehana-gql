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
        <div className="font-body flex flex-col md:flex-row bg-purpureo-900">
          <div className="border-r-2 border-t-4 border-b-4 border-purpureo-900 md:w-1/2">
            <Main></Main>
          </div>
          <div className="border-l-2 border-t-4 border-b-4 border-purpureo-900 md:w-1/2">
            <Details></Details>
          </div>
        </div>
        </ApolloProvider>
    </RecoilRoot>
  );
}

export default App;
