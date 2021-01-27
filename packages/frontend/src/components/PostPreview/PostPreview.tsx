/*
 * CS3099 Group A3
 */

import React from "react";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import UserIcon from "../../components/UserIcon";
import PostHeader from "../PostHeader";

interface PostValues {
  username: string;
  title: string;
  postId: string;
  server: string;
  community: string;
}

const PostPreview = (props: PostValues): JSX.Element => {
  return (
    <Grid item container spacing={2}>
      <Grid item xs={1} container justify="flex-end">
        <UserIcon username={props.username} small />
      </Grid>
      <Grid item xs={11} container direction="column" justify="flex-start">
        <Card style={{ textAlign: "left" }}>
          <CardActionArea
            disableRipple
            href={`/instances/${props.server}/communities/${props.community}/posts/${props.postId}`}
          >
            <PostHeader
              post={true}
              username={props.username}
              id={props.postId}
              host={props.server}
            />
            <CardContent>
              <Typography variant="body1">{props.title}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostPreview;
