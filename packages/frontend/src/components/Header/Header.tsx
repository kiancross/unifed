/*
 * CS3099 Group A3
 */

import React, { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, ButtonGroup, IconButton, Toolbar } from "@material-ui/core";
import { UserContext } from "../../contexts/user";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "../../assets/unifed.svg";
import styles from "./Header.module.scss";
import UserIcon from "../../components/UserIcon";
import SearchInput from "./SearchInput";

const Header = (): ReactElement | null => {
  const user = useContext(UserContext);

  if (!user.details) return null;

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
          <IconButton href={"/user/" + user.details.username}>
            <UserIcon username={user.details.username} small />
          </IconButton>
          <IconButton href="/account" color="inherit">
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={user.logout} color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
