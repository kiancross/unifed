/*
 * CS3099 Group A3
 */

import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, ButtonGroup, IconButton, Toolbar } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "assets/unifed.svg";
import styles from "./Header.module.scss";
import UserIcon from "../../components/UserIcon";
import SearchInput from "./SearchInput";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";

interface HeaderProps {
  username: string;
  onLogout: () => void;
  onThemeChange: () => void;
  isDarkMode: boolean;
}

const Header = (props: HeaderProps): JSX.Element => {
  console.log(props.isDarkMode);
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
          <IconButton onClick={props.onThemeChange}>
            {props.isDarkMode ? (
              <Brightness7Icon />
            ) : (
              <Brightness3Icon style={{ color: "white" }} />
            )}
          </IconButton>
          <IconButton href={"/user/" + props.username}>
            <UserIcon username={props.username} small />
          </IconButton>
          <IconButton href="/account" color="inherit">
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={props.onLogout} color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
