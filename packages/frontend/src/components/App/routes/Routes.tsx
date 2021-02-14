/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import AccountSettingsPage from "../../../pages/AccountSettingsPage";
import LoginPage from "../../../pages/LoginPage";
import RegistrationPage from "../../../pages/RegistrationPage";
import EmailVerificationPage from "../../../pages/EmailVerificationPage";
import CommunityPostsPage from "../../../pages/CommunityPostsPage";
import CreatePostPage from "../../../pages/CreatePostPage";
import PostPage from "../../../pages/PostPage";
import UserProfilePage from "../../../pages/UserProfilePage";
import PasswordResetRequestPage from "../../../pages/PasswordResetRequestPage";
import PasswordResetPage from "../../../pages/PasswordResetPage";
import ErrorMessage from "../../ErrorMessage";

const Routes = (): ReactElement => {
  const loggedIn = true;

  const redirectHome = <Redirect to="/instances/this/communities/all/posts" />;
  const redirectLogin = <Redirect to="/login" />;

  return (
    <Switch>
      <Route exact path="/">
        {loggedIn ? redirectHome : redirectLogin}
      </Route>

      <Route exact path="/login">
        {loggedIn ? (
          redirectHome
        ) : (
          <LoginPage
            onLogin={() => {
              console.log();
            }}
          />
        )}
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

      <Route path="/instances/:server">
        <Route path="/communities/:community" component={CommunityPostsPage}>
          <Route path="/posts">
            <Route exact path="/create" component={CreatePostPage}>
              {!loggedIn ? redirectLogin : null}
            </Route>
            <Route exact path="/:post" component={PostPage}>
              {!loggedIn ? redirectLogin : null}
            </Route>
          </Route>
        </Route>
      </Route>

      <Route component={() => <ErrorMessage message="404 Page Not Found" />} />
    </Switch>
  );
};

export default Routes;
