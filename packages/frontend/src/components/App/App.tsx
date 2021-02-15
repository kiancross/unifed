/*
 * CS3099 Group A3
 */

import React, { ReactElement, useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Box } from "@material-ui/core";
import { UserContext } from "../../contexts/user";
import Header from "../../components/Header";
import CenteredLoader from "../../components/CenteredLoader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import AccountSettingsPage from "../../pages/AccountSettingsPage";
import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import EmailVerificationPage from "../../pages/EmailVerificationPage";
import CommunityPostsPage from "../../pages/CommunityPostsPage";
import CreatePostPage from "../../pages/CreatePostPage";
import PostPage from "../../pages/PostPage";
import UserProfilePage from "../../pages/UserProfilePage";
import PasswordResetRequestPage from "../../pages/PasswordResetRequestPage";
import PasswordResetPage from "../../pages/PasswordResetPage";
import ErrorMessage from "../ErrorMessage";

const App = (): ReactElement => {
  const user = useContext(UserContext);

  const loggedIn = !!user.details;
  const redirectHome = <Redirect to="/instances/this/communities/all/posts" />;
  const redirectLogin = <Redirect to="/login" />;

  return (
    <ErrorBoundary>
      {user.details === undefined ? (
        <CenteredLoader />
      ) : (
        <>
          <Header />
          <Box>
            <Switch>
              <Route exact path="/">
                {loggedIn ? redirectHome : redirectLogin}
              </Route>

              <Route exact path="/login">
                {loggedIn ? redirectHome : <LoginPage />}
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
              <Route component={() => <ErrorMessage message="404 Page Not Found" />} />
            </Switch>
          </Box>
        </>
      )}
    </ErrorBoundary>
  );
};

export default App;
