import React from "react";
import { Card, CardContent, Grid, Link, Typography } from "@material-ui/core";
import "fontsource-roboto";
import ReactMarkdown from "react-markdown";

interface PostValues {
  username: string;
  text: string;
  title: string;
}

const Post = (props: PostValues): JSX.Element => {
  return (
    <Grid item xs={11} container direction="column" justify="flex-start">
      <Card style={{ textAlign: "left" }}>
        <CardContent>
          <Typography variant="body2" gutterBottom>
            <Link href={"/user/" + props.username}>{props.username}</Link>
          </Typography>
          <Typography variant="h5" paragraph={true}>
            {props.title}
          </Typography>
          <ReactMarkdown>{props.text}</ReactMarkdown>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Post;
