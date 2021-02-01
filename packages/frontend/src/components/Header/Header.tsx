/*
 * CS3099 Group A3
 */

import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, ButtonGroup, Toolbar } from "@material-ui/core";
import logo from "assets/unifed.svg";
import styles from "./Header.module.scss";
import SearchInput from "./SearchInput";
import AccountMenu from "./AccountMenu";

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <AppBar color="primary" position="sticky">
      <Toolbar variant="dense">
        <Box component="span" m={1.3}>
          <Link to="/">
            <img src={logo} alt="Unifed" className={styles.logo}></img>
          </Link>
        </Box>
        <div className={styles.logoText}>Unifed</div>

        <div className={styles.searchContainer}>
          <SearchInput />
        </div>

        <ButtonGroup size="small" className={styles.buttonGroup}>
          <AccountMenu username={props.username} onLogout={props.onLogout} />
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
