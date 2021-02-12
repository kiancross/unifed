/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { AppBar, Box, ButtonGroup, IconButton, Toolbar } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "assets/unifed.svg";
import styles from "./Header.module.scss";
import UserIcon from "../../components/UserIcon";
import SearchInput from "./SearchInput";
import SimpleModal from "../SimpleModal";
import CommunityCreationCard from "./CommunityCreationCard";

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

interface Params {
  community: string;
  server: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  const { server } = useParams<Params>();
  const [redirect, setRedirect] = useState<string | undefined>();

  const onSuccess = (communityID: string) => {
    setRedirect("/instances/" + server + "/communities/" + communityID + "/posts");
  };

  if (redirect) return <Redirect to={redirect} />;
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
          <IconButton href={"/user/" + props.username}>
            <UserIcon username={props.username} small />
          </IconButton>
          <SimpleModal body={<CommunityCreationCard onSuccess={onSuccess} />} />
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
