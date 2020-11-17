/*
 * CS3099 Group A3
 */

import React, {useState} from "react";
import { accountsClient } from "./utils/accounts";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
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

import Header from "./components/Header";
import { Box } from "@material-ui/core";

function Unifed(): JSX.Element {

  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  async function isUserLoggedIn() {
    const result = await accountsClient.getUser();
    setLoggedIn(result !== null);
  }

  isUserLoggedIn();

  if (loggedIn === null) return <div/>;

  const homePath = `/instances/${window.location.host}/communities/all/posts`;
  const redirectHome = <Redirect to={homePath} />;
  const redirectLogin = <Redirect to="/login" />;

  return (
    <Router>
      {loggedIn ? <Header /> : null}
      <Box className="App-header">
        <Switch>

          <Route exact path="/">{ loggedIn ? redirectHome : redirectLogin }</Route>

          <Route exact path="/login">{ loggedIn ? redirectHome : <LoginForm onLogin={() => setLoggedIn(true) } /> }</Route>

          <Route exact path="/reset-password" component={ResetPasswordRequest} >{ loggedIn ? redirectHome : null }</Route>
          <Route exact path="/reset-password/:token" component={ResetPassword}>{ loggedIn ? redirectHome : null }</Route>
          <Route exact path="/register" component={RegisterForm}>{ loggedIn ? redirectHome : null }</Route>
          <Route exact path="/verify-email/:token" component={VerifyEmailPage}>{ loggedIn ? redirectHome : null }</Route>

          <Route exact path="/account" component={AccountSettingsPage}>{ !loggedIn ? redirectLogin : null }</Route>
          <Route exact path="/user/:username" component={PublicUserProfile}>{ !loggedIn ? redirectLogin : null }</Route>
          <Route
            exact
            path="/instances/:server/communities/:community/posts"
            component={CommunityPostsPage}
          >{ !loggedIn ? redirectLogin : null }</Route>
          <Route
            exact
            path="/instances/:server/communities/:community/posts/create"
            component={MakePost}
          >{ !loggedIn ? redirectLogin : null }</Route>
          <Route
            exact
            path="/instances/:server/communities/:community/posts/:post"
            component={PostPage}
          >{ !loggedIn ? redirectLogin : null }</Route>
          <Route component={PageNotFound} />
        </Switch>
      </Box>
    </Router>
  );
}

export default Unifed;
