import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import {ApolloClient,createHttpLink,InMemoryCache,ApolloProvider} from '@apollo/client'
// const httplink=createHttpLink({
//   uri:'http://localhost:3000/graphql'
// })

// const client=new ApolloClient({
//   link:httplink,
//   cache:new InMemoryCache()
// })
ReactDOM.render(
  
 <React.StrictMode>
    <App />
  </React.StrictMode>
 ,
  document.getElementById('root')
);