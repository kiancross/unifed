/*
 * CS3099 Group A3
 */

import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import App from "./components/App";
import { apolloClient } from "./helpers/apollo-client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
