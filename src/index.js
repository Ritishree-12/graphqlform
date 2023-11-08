import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { typeDefs } from './schema/type-def';
import { resolvers } from './schema/resolvers';


// const { ApolloServer } = require("apollo-server");
// const server = new ApolloServer({ typeDefs, resolvers })

// server.listen().then(({ url }) => {
//   console.log(`Yours api is running:${url}`)
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
