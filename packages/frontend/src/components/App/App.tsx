/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { Box, Paper } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { standardTheme, darkTheme } from "../../helpers/themes";
import { createMuiTheme } from "@material-ui/core/styles";

import { accountsClient } from "../../helpers/accounts";
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
import Header from "../../components/Header";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import ErrorMessage from "../ErrorMessage";
import UserContext from "../UserContext";

const App = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string>("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") == "true");

  function updateTheme() {
    if (localStorage.getItem("darkMode") == "false") {
      localStorage.setItem("darkMode", "true");
    } else if (localStorage.getItem("darkMode") == "true") {
      localStorage.setItem("darkMode", "false");
    }
    setDarkMode(!darkMode);
  }

  const theme = createMuiTheme(darkMode ? darkTheme : standardTheme);

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
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={username}>
          <Paper square style={{ height: "1000px" }}>
            <Router>
              {loggedIn ? (
                <Header
                  username={username}
                  onLogout={logOut}
                  onThemeChange={() => updateTheme()}
                  isDarkMode={darkMode}
                />
              ) : null}
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
                  <Route component={() => <ErrorMessage message="404 Page Not Found" />} />
                </Switch>
              </Box>
            </Router>
          </Paper>
        </UserContext.Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
