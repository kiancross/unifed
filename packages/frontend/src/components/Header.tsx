import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import logo from "./../images/main_logo.png";

// Simple placeholder header
const Header = (): JSX.Element => {
  const logo_size = 30;
  return (
    <AppBar color="primary" position="sticky">
      <Toolbar variant="dense">
        <Box component="span" m={1}>
          <img src={logo} alt="logo" width={logo_size} height={logo_size} />
        </Box>
        <Typography variant="h5">UNIFED</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
