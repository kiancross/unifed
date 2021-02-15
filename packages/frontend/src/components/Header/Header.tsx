/*
 * CS3099 Group A3
 */

import React, { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";
import { UserContext } from "../../contexts/user";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "../../assets/unifed.svg";
import styles from "./Header.module.scss";
import UserIcon from "../../components/UserIcon";
import SearchInput from "./SearchInput";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";

interface Props {
  onThemeChange: () => void;
  isDarkMode: boolean;
}

const Header = (props: Props): ReactElement | null => {
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

        <IconButton onClick={props.onThemeChange}>
          {props.isDarkMode ? <Brightness7Icon /> : <Brightness3Icon style={{ color: "white" }} />}
        </IconButton>
        <IconButton href={"/user/" + user.details.username}>
          <UserIcon username={user.details.username} small />
        </IconButton>
        <IconButton href="/account" color="inherit">
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={user.logout} color="inherit">
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
