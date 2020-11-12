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
import VerifyEmailPage from "./pages/VerifyEmail";
import PublicUserProfile from "./pages/PublicUserProfile";
import HomePage from "./pages/Home";
import AccountSettingsPage from "./pages/AccountSettings";
import MakePost from "./pages/MakePost"
import PostPage from "./pages/PostPage"

import Header from "./components/Header";
import { Box } from "@material-ui/core";

function App(): JSX.Element {
  return (
    <div className="App">
      <Header />
      <Box className="App-header" component="span" m={3}>
        <Router>
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/account" component={AccountSettingsPage} />
            <Route exact path="/reset-password" component={PasswordResetForm} />
            <Route exact path="/register" component={RegisterForm} />
            <Route path="/user/:username" component={PublicUserProfile} />
            <Route path="/verify-email/:token" component={VerifyEmailPage} />
            <Route path="/make-post" component={MakePost} />
            <Route path="/posts/:postId" component={PostPage} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </Box>
    </div>
  );
}

export default App;
