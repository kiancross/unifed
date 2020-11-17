import React from "react";
import { Button, Container, Typography } from "@material-ui/core";

const PageNotFound = (): JSX.Element => {
  return (
    <Container style={{ paddingTop: "10rem" }}>
      <Typography variant="h6" gutterBottom>
        404 Page Not Found
      </Typography>
      <Button color="primary" variant="contained" href="/">
        Return Home
      </Button>
    </Container>
  );
};

export default PageNotFound;
