/*
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Robert Mardall
 * Copyright (C) 2021 Lewis Mazzei
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { ReactElement, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Brightness3 as Brightness3Icon, Brightness7 as Brightness7Icon } from "@material-ui/icons";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";

import { UserContext } from "../../../contexts";
import logo from "../../../assets/unifed.svg";

import { SearchInput } from "./SearchInput";
import { CreateCommunityDialog } from "./CreateCommunityDialog";
import { AccountMenu } from "./AccountMenu";

/**
 * Properties for the [[`Header`]] component.
 *
 * @internal
 */
export interface HeaderProps {
  /**
   * Function called when the 'dark mode' button in the [[`Header`]] is clicked.
   */
  onThemeChange: (darkMode: boolean) => void;

  /**
   * Indicates whether dark mode is currently enabled.
   */
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

/**
 * The header of the application.
 *
 * Outline:
 *
 *  - Allows the user to
 *    - return to the home page by clicking the logo;
 *    - search for communities;
 *    - toggle the theme for the application;
 *    - take actions on their profile e.g. logout.
 *
 * @param props Properties passed to the component. See [[`HeaderProps`]].
 *
 * @internal
 */
export function Header(props: HeaderProps): ReactElement | null {
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
}
