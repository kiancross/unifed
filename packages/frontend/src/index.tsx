/*
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Lewis Mazzei
 * Copyright (C) 2020 Robert Mardall
 * Copyright (C) 2020 Allan Mathew Chacko
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
