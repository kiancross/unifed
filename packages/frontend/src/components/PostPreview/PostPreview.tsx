/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import UserIcon from "../../components/UserIcon";
import PostHeader from "../PostHeader";
import PostEditor from "../../components/PostHeader/PostEditor";

interface PostValues {
  username: string;
  title: string;
  id: string;
  server: string;
  community: string;
  body: string;
}

const PostPreview = (props: PostValues): JSX.Element => {
  const [editorOpen, setEditorOpen] = useState(false);

  const content = editorOpen ? (
    <div>
      <PostEditor
        body={props.body}
        onClose={() => setEditorOpen(false)}
        title={props.title}
        server={props.server}
        id={props.id}
      />
    </div>
  ) : (
    <Grid item container spacing={2}>
      <Grid item xs={1} container justify="flex-end">
        <UserIcon username={props.username} small />
      </Grid>
      <Grid item xs={11} container direction="column" justify="flex-start">
        <Card style={{ textAlign: "left" }}>
          <CardActionArea
            disableRipple
            href={`/instances/${props.server}/communities/${props.community}/posts/${props.id}`}
          >
            <PostHeader
              onToggleEdit={() => setEditorOpen(true)}
              title={props.title}
              username={props.username}
              id={props.id}
              server={props.server}
            />
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
