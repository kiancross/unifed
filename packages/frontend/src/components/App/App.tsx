/*
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
  ModerationPage,
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
                <Route exact path="/moderation">
                  {loggedIn ? <ModerationPage /> : redirectLogin}
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
                  path="/instances/:host/communities/:community/posts"
                  component={CommunityPostsPage}
                >
                  {!loggedIn ? redirectLogin : null}
                </Route>

                <Route
                  exact
                  path="/instances/:host/communities/:community/posts/create"
                  component={CreatePostPage}
                >
                  {!loggedIn ? redirectLogin : null}
                </Route>
                <Route
                  exact
                  path="/instances/:host/communities/:community/posts/:post"
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
