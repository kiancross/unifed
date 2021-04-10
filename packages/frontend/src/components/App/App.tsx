/*
 * CS3099 Group A3
 */

import { ReactElement, useContext, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import {
  Box,
  CssBaseline,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";

import { lightTheme, darkTheme } from "../../helpers";
import { UserContext } from "../../contexts";

import {
  HomePage,
  LoginPage,
  RegistrationPage,
  EmailVerificationPage,
  CommunityPostsPage,
  CommunityCallPage,
  CreatePostPage,
  PostPage,
  UserProfilePage,
  PasswordResetRequestPage,
  PasswordResetPage,
  PrivacyNoticePage,
  AccountSettingsPage,
} from "../../pages";

import { CenteredLoader, ErrorBoundary, ErrorMessage } from "..";

import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * The frontend of the Unifed application.
 *
 * Outline:
 *
 *  - A [[`Header`]] and a [[`Footer`]] are present on most pages of the
      application. The header is hidden when the user is not authenticated.
 *
 * @internal
 */
export function App(): ReactElement {
  const user = useContext(UserContext);

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  localStorage.setItem("darkMode", JSON.stringify(darkMode));

  const theme = createMuiTheme(darkMode && user.details ? darkTheme : lightTheme);

  const loggedIn = !!user.details;
  const redirectHome = <Redirect to="/" />;
  const redirectLogin = <Redirect to="/login" />;

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {user.details === undefined ? (
          <CenteredLoader />
        ) : (
          <>
            <Header onThemeChange={(darkMode) => setDarkMode(darkMode)} darkMode={darkMode} />
            <Box style={{ flexGrow: 1 }}>
              <Switch>
                <Route exact path="/">
                  {loggedIn ? <HomePage /> : redirectLogin}
                </Route>

                <Route exact path="/privacy-notice" component={PrivacyNoticePage} />

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

                <Route
                  exact
                  path="/instances/this/communities/:community/call"
                  component={CommunityCallPage}
                >
                  {!loggedIn ? redirectLogin : null}
                </Route>
                <Route component={() => <ErrorMessage message="404 Page Not Found" />} />
              </Switch>
            </Box>
            <Footer />
          </>
        )}
      </ThemeProvider>
    </ErrorBoundary>
  );
}
