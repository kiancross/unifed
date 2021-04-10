/*
 * CS3099 Group A3
 */

import { ReactElement, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardContent, Grid, Typography, makeStyles } from "@material-ui/core";
import { PostEditor, PostHeader } from "..";

/**
 * Properties for the [[`PostPreview`]] component.
 */
export interface PostPreviewProps {
  /**
   * Author of the post.
   */
  username: string;

  /**
   * Title of the post. This is `undefined` for comments.
   */
  title: string;

  /**
   * ID of the post.
   */
  id: string;

  /**
   * Server the post exists on.
   */
  server: string;

  /**
   * Community the post is part of.
   */
  community: string;

  /**
   * Content of the post.
   */
  body: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "left",
    background: theme.palette.secondary.main,
  },
}));

/**
 * Used to show a preview of a post
 *
 * Outline:
 *
 *  - The preview shows:
 *    - The title of the post.
 *    - The name of the author of the post.
 *    - The user icon of the author.
 *
 * @param props Properties passed to the component. See [[`PostPreviewProps`]].
 *
 * @internal
 */
export function PostPreview(props: PostPreviewProps): ReactElement {
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
      <Grid item xs={11} container direction="column" justify="flex-start">
        <Card className={classes.card}>
          <PostHeader
            community={props.community}
            onToggleEdit={() => setEditorOpen(true)}
            title={props.title}
            username={props.username}
            id={props.id}
            server={props.server}
            isPreview
          />
          <CardActionArea
            disableRipple
            component={RouterLink}
            to={`/instances/${props.server}/communities/${props.community}/posts/${props.id}`}
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
}
