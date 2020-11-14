import React from "react";
import { Card, CardActionArea, CardContent, Grid, Link, Typography } from "@material-ui/core";
import UserIcon from "./UserIcon";
import "fontsource-roboto";

interface PostValues {
  username: string;
  title: string;
  postId: string;
}

const PostPreview = (props: PostValues): JSX.Element => {
  return (
    <Grid item container spacing={2}>
      <Grid item xs={1} container justify="flex-end">
        <UserIcon username={props.username} small />
      </Grid>
      <Grid item xs={11} container direction="column" justify="flex-start">
        <Card style={{ textAlign: "left" }}>
          <CardActionArea disableRipple href={"/posts/" + props.postId}>
            <CardContent>
              <Typography variant="body2" gutterBottom>
                <Link href={"/user/" + props.username}>{props.username}</Link>
              </Typography>
              <Typography variant="body1">{props.title}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostPreview;
