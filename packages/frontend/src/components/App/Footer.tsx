/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { Box, Container, makeStyles, Paper } from "@material-ui/core";
import { Link } from "../Links";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));

const Footer = (): ReactElement => {
  const classes = useStyles();
  return (
    <Box paddingTop="3rem">
      <Paper elevation={0} style={{ textAlign: "left", padding: "1.5rem" }}>
        <Container maxWidth="lg">
          <Link classes={classes} to="/privacy-notice">
            Privacy Notice
          </Link>
        </Container>
      </Paper>
    </Box>
  );
};

export default Footer;
