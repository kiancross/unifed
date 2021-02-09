/*
 * CS3099 Group A3
 */

import { Box, CardActions, CardHeader, Container, Paper } from "@material-ui/core";
import React from "react";
import SubscribeButton from "./SubscribeButton";

interface Props {
  id: string;
  title: string;
  server: string;
  isSubscribed: boolean;
}

const CommunityHeader = (props: Props): JSX.Element => {
  return (
    <Box paddingBottom="3rem">
      <Paper elevation={0} style={{ textAlign: "left" }}>
        <Container maxWidth="lg">
          <CardHeader title={props.title} subheader={props.server} />
          <CardActions>
            <SubscribeButton
              id={props.id}
              server={props.server}
              isSubscribed={props.isSubscribed}
            />
          </CardActions>
        </Container>
      </Paper>
    </Box>
  );
};

export default CommunityHeader;
