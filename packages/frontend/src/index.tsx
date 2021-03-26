/*
 * CS3099 Group A3
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { reportWebVitals } from "./report-web-vitals";

import { apolloClient } from "./helpers";
import { UserProvider } from "./contexts";
import { App } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
