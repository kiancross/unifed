/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UserIcon from "../../components/UserIcon";
import PostHeader from "../PostHeader";
import PostEditor from "../../components/PostEditor";

interface PostValues {
  username: string;
  title: string;
  id: string;
  server: string;
  community: string;
  body: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "left",
    background: theme.palette.secondary.main,
  },
}));

const PostPreview = (props: PostValues): JSX.Element => {
  const [editorOpen, setEditorOpen] = useState(false);
  const classes = useStyles();

  const content = editorOpen ? (
    <PostEditor
      body={props.body}
      title={props.title}
      server={props.server}
      id={props.id}
      submitButtonText="Save Post"
      onSuccess={() => window.location.assign(window.location.href)}
      onCancel={() => setEditorOpen(false)}
    />
  ) : (
    <Grid item container spacing={2}>
      <Grid item xs={1} container justify="flex-end">
        <UserIcon username={props.username} small />
      </Grid>
      <Grid item xs={11} container direction="column" justify="flex-start">
        <Card className={classes.card}>
          <PostHeader
            onToggleEdit={() => setEditorOpen(true)}
            title={props.title}
            username={props.username}
            id={props.id}
            server={props.server}
            isPreview
          />
          <CardActionArea
            disableRipple
            href={`/instances/${props.server}/communities/${props.community}/posts/${props.id}`}
          >
            <CardContent>
              <Typography variant="body1">{props.title}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );

  return content;
};

export default PostPreview;
