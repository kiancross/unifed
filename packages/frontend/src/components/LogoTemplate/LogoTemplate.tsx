/*
 * CS3099 Group A3
 */

import React, { ReactElement, ReactNode } from "react";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/unifed.svg";

interface Props {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
}

const useStyles = makeStyles({
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
    color: "#3f3f40",
    fontFamily: "'Roboto Mono', monospace",
    fontSize: "4em",
    textAlign: "center",
  },
});

const LogoTemplate = (props: Props): ReactElement => {
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

export default LogoTemplate;
