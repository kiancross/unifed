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
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword";
import PageNotFound from "./pages/404";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import VerifyEmailPage from "./pages/VerifyEmail";

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/reset-password" component={ResetPasswordRequest} />
            <Route path="/reset-password/:token" component={ResetPassword} />
            <Route exact path="/register" component={RegisterForm} />
            <Route path="/verify-email/:token" component={VerifyEmailPage} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
