/*
 * CS3099 Group A3
 */

import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Box, Card, CardContent, Grid, Link, Typography } from "@material-ui/core";
import UserIcon from "components/UserIcon";
import MarkdownViewer from "components/MarkdownViewer";

interface PostValues {
  username: string;
  text: string;
  title: string;
  id: string;
}

const styles = {
  cardcontent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
};

const Comment = (props: PostValues): JSX.Element => {
  const theme = useTheme();

  return (
    <Grid item container direction="row-reverse" spacing={2}>
      <Grid item xs={11} container direction="column">
        <Box borderLeft={4} borderColor={theme.palette.primary.main}>
          <Card elevation={1} square style={{ textAlign: "left" }}>
            <CardContent style={styles.cardcontent}>
              <Typography variant="body2" gutterBottom>
                <Link href={"/user/" + props.username}>{props.username}</Link>
                &nbsp; &#8212; &nbsp;
                <Link href={props.id}>View Replies</Link>
              </Typography>
              <Typography variant="body2">
                <MarkdownViewer>{props.text}</MarkdownViewer>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={1} container justify="flex-end">
        <Box paddingTop="1rem">
          <UserIcon username={props.username} small />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Comment;
