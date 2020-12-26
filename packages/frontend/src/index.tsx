/*
 * CS3099 Group A3
 */

import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/client";
import * as serviceWorker from "./service-worker";
import App from "components/App";
import { apolloClient } from "helpers/apollo-client";
import { standardTheme } from "helpers/themes";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={standardTheme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
