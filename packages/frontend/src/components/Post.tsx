import React from "react";
import { Card, CardContent, Grid, Link, Typography } from "@material-ui/core";
import "fontsource-roboto";
import MarkdownViewer from "./MarkdownViewer";

interface PostValues {
  username: string;
  text: string;
  title: string;
}

const Post = (props: PostValues): JSX.Element => {
  return (
    <Grid item xs={12}>
      <Card style={{ textAlign: "left" }}>
        <CardContent>
          <Typography variant="body2" gutterBottom>
            <Link href={"/user/" + props.username}>{props.username}</Link>
          </Typography>
          <Typography variant="h6">{props.title}</Typography>
          <Typography variant="body2">
            <MarkdownViewer>{props.text}</MarkdownViewer>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Post;
