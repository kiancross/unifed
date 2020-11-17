/*
 * CS3099 Group A3
 */

import React from "react";
import { Container, Grid } from "@material-ui/core";
import logo from "./../images/unifed.svg";
import styles from "./NonAuthenticatedTemplate.module.scss";

const NonAuthenticatedTemplate = (prop: any): JSX.Element => {
  return (
    <Container maxWidth="lg" className={styles.container}>
      <Grid container justify="center" alignItems="center" direction="column" className={styles.container}>
        <Grid container spacing={10} justify="space-evenly">
          <Grid item container xs={4} direction="column" justify="center">
            <div>
              <img src={logo} alt="Unifed" className={styles.logo}></img>
              <div className={styles.logoText}>Unifed</div>
            </div>
          </Grid>
          <Grid item container xs={6} direction="column" justify="center">{prop.children}</Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NonAuthenticatedTemplate;
