import React from "react";
import { Card, CardContent, Grid, Link, Typography } from "@material-ui/core";
import UserIcon from "./UserIcon";
import "fontsource-roboto";
import ReactMarkdown from 'react-markdown'

interface PostValues {
  username: string;
  text: string;
  title: string;
}

const Post = (props: PostValues): JSX.Element => {  
  return (
    <Grid item container spacing={2}>
      <Grid item xs={1} container justify="flex-end">
        <UserIcon username={props.username} small />
      </Grid>
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
    </Grid>
  );
};

export default Post;
