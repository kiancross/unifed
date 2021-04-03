/*
 * CS3099 Group A3
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
 * @internal
 */
export const LogoTemplate = (props: LogoTemplateProps): ReactElement => {
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
              <div>
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
};
