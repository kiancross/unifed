import React from "react";
import { Box, Card, CardContent, Grid, Link, Typography } from "@material-ui/core";
import UserIcon from "./UserIcon";
import "fontsource-roboto";
import theme from "../utils/mui-theme";
import MarkdownViewer from "./MarkdownViewer";

interface PostValues {
  username: string;
  text: string;
  title: string;
}

const styles = {
  cardcontent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
};

const Comment = (props: PostValues): JSX.Element => {
  return (
    <Grid item container spacing={2}>
      <Grid item xs={1} container justify="flex-end">
        <Box paddingTop="1rem">
          <UserIcon username={props.username} small />
        </Box>
      </Grid>
      <Grid item xs={11} container direction="column">
        <Box borderLeft={4} borderColor={theme.palette.primary.main}>
          <Card elevation={1} square style={{ textAlign: "left" }}>
            <CardContent style={styles.cardcontent}>
              <Typography variant="body2" gutterBottom>
                <Link href={"/user/" + props.username}>{props.username}</Link>
              </Typography>
              <MarkdownViewer>{props.text}</MarkdownViewer>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Comment;
