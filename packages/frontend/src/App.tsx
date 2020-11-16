/*
 * CS3099 Group A3
 */

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword";
import PageNotFound from "./pages/404";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import VerifyEmailPage from "./pages/VerifyEmail";
import PublicUserProfile from "./pages/PublicUserProfile";
import CommunityPostsPage from "./pages/CommunityPostsPage";
import AccountSettingsPage from "./pages/AccountSettings";
import MakePost from "./pages/MakePost";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";

import Header from "./components/Header";
import { Box } from "@material-ui/core";

function App(): JSX.Element {
  return (
    <div className="App">
      <Router>
        <Header />
        <Box className="App-header">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/reset-password" component={ResetPasswordRequest} />
            <Route exact path="/reset-password/:token" component={ResetPassword} />
            <Route exact path="/account" component={AccountSettingsPage} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/user/:username" component={PublicUserProfile} />
            <Route exact path="/verify-email/:token" component={VerifyEmailPage} />
            <Route
              exact
              path="/instances/:server/communities/:community/posts"
              component={CommunityPostsPage}
            />
            <Route
              exact
              path="/instances/:server/communities/:community/posts/create"
              component={MakePost}
            />
            <Route
              exact
              path="/instances/:server/communities/:community/posts/:post"
              component={PostPage}
            />
            <Route component={PageNotFound} />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}

export default App;
