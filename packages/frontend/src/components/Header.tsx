import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import logo from "./../images/unifed.svg";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

// Simple placeholder header
const Header = (): JSX.Element => {
  return (
    <AppBar color="primary" position="sticky">
      <Toolbar variant="dense">
        <Box component="span" m={1}>
          <Link to="/">
            <img src={logo} alt="Unifed" className={styles.logo}></img>
          </Link>
        </Box>
        <div className={styles.logoText}>Unifed</div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
