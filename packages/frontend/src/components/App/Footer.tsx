/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { Box, Container, Paper, Link } from "@material-ui/core";

const Footer = (): ReactElement => {
  return (
    <Box paddingTop="3rem">
      <Paper elevation={0} style={{ textAlign: "left", padding: "1.5rem" }}>
        <Container maxWidth="lg">
          <Link href="/privacy-notice">Privacy Notice</Link>
        </Container>
      </Paper>
    </Box>
  );
};

export default Footer;
