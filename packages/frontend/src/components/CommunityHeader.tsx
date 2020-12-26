/*
 * CS3099 Group A3
 */

import { Box, CardActions, CardHeader, Container, Paper } from "@material-ui/core";
import React from "react";

interface Props {
  title: string;
  server: string;
}

const CommunityHeader = (props: Props): JSX.Element => {
  return (
    <Box paddingBottom="3rem">
      <Paper elevation={0} style={{ textAlign: "left" }}>
        <Container maxWidth="lg">
          <CardHeader title={props.title} subheader={props.server} />
          <CardActions />
        </Container>
      </Paper>
    </Box>
  );
};

export default CommunityHeader;
