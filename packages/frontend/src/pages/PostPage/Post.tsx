/*
 * CS3099 Group A3
 */

import { ReactElement, useState } from "react";
import { Card, CardContent, Grid, Typography, makeStyles } from "@material-ui/core";

import { MarkdownViewer, PostHeader, PostEditor } from "../../components";

/**
 * Properties for the [[`Post`]] component.
 *
 * @internal
 */
export interface PostProps {
  /**
   * The username of the author of the post.
   */
  username: string;

  /**
   * The body of the post.
   */
  body: string;

  /**
   * The title of the post.
   */
  title: string;

  /**
   * The ID of the post.
   */
  id: string;

  /**
   * The host the post is on.
   */
  host: string;

  /**
   * The community the post is a part of.
   */
  community: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.secondary.main,
    textAlign: "left",
  },
}));

/**
 * Displays a post.
 *
 * Outline:
 *
 *  - Shows the title and body of a post.
 *
 *  - The author or admin of the community the post is in can edit or delete the post through its [[`PostHeader`]].
 *
 * @param props Properties passed to the component. See [[`PostProps`]].
 *
 * @internal
 */
export function Post(props: PostProps): ReactElement {
  const [editorOpen, setEditorOpen] = useState(false);
  const classes = useStyles();

  const content = editorOpen ? (
    <PostEditor
      body={props.body}
      title={props.title}
      host={props.host}
      id={props.id}
      submitButtonText="Save Post"
      onSuccess={() => setEditorOpen(false)}
      onCancel={() => setEditorOpen(false)}
    />
  ) : (
    <Grid item xs={12}>
      <Card color="primary" className={classes.card}>
        <PostHeader
          community={props.community}
          onToggleEdit={() => setEditorOpen(true)}
          title={props.title}
          id={props.id}
          host={props.host}
          username={props.username}
        />
        <CardContent style={{ paddingTop: 0 }}>
          <Typography variant="h6">{props.title ? props.title : "Comment"}</Typography>
          <MarkdownViewer>{props.body}</MarkdownViewer>
        </CardContent>
      </Card>
    </Grid>
  );

  return content;
}
