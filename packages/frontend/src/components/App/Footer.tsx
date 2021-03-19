/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import { Box, Container, makeStyles, Paper, Link as ExternalLink } from "@material-ui/core";
import { Link as InternalLink } from "../Links";

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(4),
  },
}));

const Footer = (): ReactElement => {
  const classes = useStyles();
  return (
    <Box paddingTop="3rem">
      <Paper elevation={0} style={{ textAlign: "left", padding: "1.5rem" }}>
        <Container maxWidth="lg">
          <ExternalLink
            className={classes.link}
            href="https://kiancross.github.io/unifed/"
            target="_blank"
          >
            Help
          </ExternalLink>
          <InternalLink className={classes.link} to="/privacy-notice">
            Privacy Notice
          </InternalLink>
        </Container>
      </Paper>
    </Box>
  );
};

export default Footer;
