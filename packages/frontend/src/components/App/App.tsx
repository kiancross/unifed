/*
 * CS3099 Group A3
 */

import React, { ReactElement, useContext, useState } from "react";
import {
  Box,
  CssBaseline,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import { Route, Redirect, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { lightTheme, darkTheme } from "../../helpers/themes";
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

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") == "true");

  function updateTheme() {
    if (localStorage.getItem("darkMode") == "false") {
      localStorage.setItem("darkMode", "true");
    } else if (localStorage.getItem("darkMode") == "true") {
      localStorage.setItem("darkMode", "false");
    }
    setDarkMode(!darkMode);
  }

  const theme = createMuiTheme(darkMode ? darkTheme : lightTheme);

  const loggedIn = !!user.details;
  const redirectHome = <Redirect to="/instances/this/communities/all/posts" />;
  const redirectLogin = <Redirect to="/login" />;

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {user.details === undefined ? (
          <CenteredLoader />
        ) : (
          <>
            <Header onThemeChange={() => updateTheme()} isDarkMode={darkMode} />
            <Box style={{ flexGrow: 1 }}>
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
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
