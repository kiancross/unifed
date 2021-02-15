/*
 * CS3099 Group A3
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import { apolloClient } from "./helpers/apollo-client";
import { standardTheme } from "./helpers/themes";
import { UserProvider } from "./contexts/user";
import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={standardTheme}>
        <UserProvider>
          <Router>
            <App />
          </Router>
        </UserProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
