/*
 * CS3099 Group A3
 */

import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Link,
  // Redirect
} from "react-router-dom";

//Pages
import PasswordResetForm from "./pages/PasswordReset";
import PageNotFound from "./pages/404";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/reset-password" component={PasswordResetForm} />
            <Route exact path="/register" component={RegisterForm} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
