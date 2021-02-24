/*
 * CS3099 Group A3
 */

import React, { ReactElement, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Tooltip, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../contexts/user";
import logo from "../../assets/unifed.svg";
import SearchInput from "./SearchInput";
import CreateCommunityDialog from "./CreateCommunityDialog";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import AccountMenu from "./AccountMenu";

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
  const isMobile = useMediaQuery("(max-width: 960px)");

  const user = useContext(UserContext);
  const classes = useStyles();
  const logoText = isMobile ? null : <div className={classes.logoText}>Unifed</div>;

  if (!user.details) return null;

  return (
    <AppBar color="primary" position="sticky">
      <Toolbar variant="dense">
        <Box component="span" m={1.3}>
          <Link to="/">
            <img src={logo} alt="Unifed" className={classes.logo}></img>
          </Link>
        </Box>
        {logoText}
        <div className={classes.searchContainer}>
          <SearchInput />
        </div>

        <Tooltip title="Dark Mode">
          <IconButton
            data-testid="dark-button"
            onClick={() => {
              setDarkMode(!darkMode);
              props.onThemeChange(!darkMode);
            }}
          >
            {props.darkMode ? (
              <Brightness7Icon style={{ color: "white" }} />
            ) : (
              <Brightness3Icon style={{ color: "white" }} />
            )}
          </IconButton>
        </Tooltip>
        <CreateCommunityDialog />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
