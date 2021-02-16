/*
 * CS3099 Group A3
 */

import React, { ReactElement, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Switch, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { UserContext } from "../../contexts/user";
import logo from "../../assets/unifed.svg";
import UserIcon from "../../components/UserIcon";
import SearchInput from "./SearchInput";

interface Props {
  onThemeChange: (darkMode: boolean) => void;
  darkMode: boolean;
}

const logoHeight = 2.5;

const useStyles = makeStyles({
  searchContainer: {
    display: "flex",
    height: `${logoHeight}em`,
    justifyContent: "center",
    width: "100%",
  },
  logo: {
    height: `${logoHeight}em`,
  },
  logoText: {
    fontFamily: "'Roboto Mono', monospace",
    fontSize: `${logoHeight * 0.8}em`,
  },
});

const Header = (props: Props): ReactElement | null => {
  const [darkMode, setDarkMode] = useState(props.darkMode);

  const user = useContext(UserContext);
  const classes = useStyles();

  if (!user.details) return null;

  return (
    <AppBar color="primary" position="sticky">
      <Toolbar variant="dense">
        <Box component="span" m={1.3}>
          <Link to="/">
            <img src={logo} alt="Unifed" className={classes.logo}></img>
          </Link>
        </Box>
        <div className={classes.logoText}>Unifed</div>

        <div className={classes.searchContainer}>
          <SearchInput />
        </div>

        <Tooltip title="Dark Mode">
          <Switch
            checked={darkMode}
            onChange={({ target }) => {
              setDarkMode(target.checked);
              props.onThemeChange(target.checked);
            }}
          />
        </Tooltip>
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
