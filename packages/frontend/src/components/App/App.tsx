/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { accountsClient } from "../../helpers/accounts";
import AccountSettingsPage from "../../pages/AccountSettingsPage";
import LoginPage from "../../pages/LoginPage";
import PageNotFoundPage from "../../pages/PageNotFoundPage";
import RegistrationPage from "../../pages/RegistrationPage";
import EmailVerificationPage from "../../pages/EmailVerificationPage";
import CommunityPostsPage from "../../pages/CommunityPostsPage";
import CreatePostPage from "../../pages/CreatePostPage";
import PostPage from "../../pages/PostPage";
import UserProfilePage from "../../pages/UserProfilePage";
import PasswordResetRequestPage from "../../pages/PasswordResetRequestPage";
import PasswordResetPage from "../../pages/PasswordResetPage";
import Header from "../../components/Header";

const App = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string>("");

  function isUserLoggedIn() {
    accountsClient.getUser().then((res) => {
      if (res && res.username) setUsername(res.username);
      setLoggedIn(res !== null);
    });
  }

  isUserLoggedIn();

  if (loggedIn === null) return <div />;

  const homePath = "/instances/this/communities/all/posts";
  const redirectHome = <Redirect to={homePath} />;
  const redirectLogin = <Redirect to="/login" />;
  const logOut = () => {
    accountsClient.logout().then(() => setLoggedIn(false));
  };

  return (
    <Router>
      {loggedIn ? <Header username={username} onLogout={logOut} /> : null}
      <Box className="App-header">
        <Switch>
          <Route exact path="/">
            {loggedIn ? redirectHome : redirectLogin}
          </Route>

          <Route exact path="/login">
            {loggedIn ? redirectHome : <LoginPage onLogin={() => setLoggedIn(true)} />}
          </Route>

          <Route exact path="/reset-password" component={PasswordResetRequestPage}>
            {loggedIn ? redirectHome : null}
          </Route>
          <Route exact path="/reset-password/:token" component={PasswordResetPage}>
            {loggedIn ? redirectHome : null}
          </Route>
          <Route exact path="/register" component={RegistrationPage}>
            {loggedIn ? redirectHome : null}
          </Route>
          <Route exact path="/verify-email/:token" component={EmailVerificationPage}>
            {loggedIn ? redirectHome : null}
          </Route>

          <Route exact path="/account" component={AccountSettingsPage}>
            {!loggedIn ? redirectLogin : null}
          </Route>
          <Route exact path="/user/:username" component={UserProfilePage}>
            {!loggedIn ? redirectLogin : null}
          </Route>
          <Route
            exact
            path="/instances/:server/communities/:community/posts"
            component={CommunityPostsPage}
          >
            {!loggedIn ? redirectLogin : null}
          </Route>
          <Route
            exact
            path="/instances/:server/communities/:community/posts/create"
            component={CreatePostPage}
          >
            {!loggedIn ? redirectLogin : null}
          </Route>
          <Route
            exact
            path="/instances/:server/communities/:community/posts/:post"
            component={PostPage}
          >
            {!loggedIn ? redirectLogin : null}
          </Route>
          <Route component={PageNotFoundPage} />
        </Switch>
      </Box>
    </Router>
  );
};

export default App;
