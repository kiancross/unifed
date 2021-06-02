/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
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

import { ReactElement, ReactNode } from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/unifed.svg";

/**
 * Properties for the [[`LogoTemplate`]] component.
 *
 * @internal
 */
export interface LogoTemplateProps {
  /**
   * The content to display on the page.
   */
  children: ReactNode;

  /**
   *  - `horizontal` - the logo and page content
   *    will be displayed side-by-side.
   *
   *  - `vertical` - the logo will be displayed
   *    above, with the page content below.
   */
  direction?: "horizontal" | "vertical";
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    padding: "1rem",
  },
  rootContainer: {
    height: "100%",
  },
  logo: {
    width: "100%",
  },
  logoText: {
    color: theme.palette.text.primary,
    fontFamily: "'Roboto Mono', monospace",
    fontSize: "4em",
    textAlign: "center",
  },
}));

/**
 * A template used for displaying the Unifed logo
 * along with some page content.
 *
 * This tends to be used for non-authenticated
 * pages, where branding is important and page
 * real-estate would not otherwise be utilised.
 *
 * @param props Properties passed to the component. See [[`LogoTemplateProps`]].
 *
 * @internal
 */
export function LogoTemplate(props: LogoTemplateProps): ReactElement {
  const classes = useStyles(props);

  const vertical = props.direction === "vertical";

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.rootContainer}>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.rootContainer}
        >
          <Grid
            container
            spacing={4}
            alignItems="center"
            justify="space-evenly"
            direction={vertical ? "column" : "row"}
          >
            <Grid item xs={9} md={4} container direction="column" justify="center">
              <div aria-label="unifed logo">
                <img src={logo} alt="Unifed" className={classes.logo}></img>
                <div className={classes.logoText}>Unifed</div>
              </div>
            </Grid>
            <Grid item container xs={12} md={vertical ? 8 : 6} direction="column" justify="center">
              {props.children}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
