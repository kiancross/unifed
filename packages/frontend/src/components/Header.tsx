import React from "react";
import { AppBar, Box, ButtonGroup, IconButton, Toolbar, Typography } from "@material-ui/core";
import logo from "./../images/unifed.svg";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import UserIcon from "./UserIcon";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

const buttonGroupStyles = {
  marginLeft: "auto",
};

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <AppBar color="primary" position="sticky">
      <Toolbar variant="dense">
        <Box component="span" m={1.3}>
          <Link to="/">
            <img src={logo} alt="Unifed" className={styles.logo}></img>
          </Link>
        </Box>
        <Typography variant="h5" className={styles.logoText}>
          Unifed
        </Typography>
        <ButtonGroup size="small" style={buttonGroupStyles}>
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
