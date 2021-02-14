/*
 * CS3099 Group A3
 */

import React, { ReactElement, useContext } from "react";
import { Box } from "@material-ui/core";
import { UserContext } from "../../contexts/user";
import Header from "../../components/Header";
import CenteredLoader from "../../components/CenteredLoader";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Routes from "./routes";

const App = (): ReactElement => {
  const user = useContext(UserContext);

  return (
    <ErrorBoundary>
      {user.details === undefined ? (
        <CenteredLoader />
      ) : (
        <>
          <Header />
          <Box>
            <Routes />
          </Box>
        </>
      )}
    </ErrorBoundary>
  );
};

export default App;
