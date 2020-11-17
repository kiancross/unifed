import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import logo from "./../images/unifed.svg";
import { Link } from "react-router-dom";

// Simple placeholder header
const Header = (): JSX.Element => {
  return (
    <AppBar color="primary" position="sticky">
      <Toolbar variant="dense">
        <Box component="span" m={1}>
          <Link to="/">
            <img src={logo} alt="st andrews logo" height="50"></img>
          </Link>
        </Box>
        <Typography variant="h5">UNIFED</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
