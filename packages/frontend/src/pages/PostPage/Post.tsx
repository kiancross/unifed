/*
 * CS3099 Group A3
 */

import React, { ReactElement, useState } from "react";
import { Card, CardContent, Grid, Typography, makeStyles } from "@material-ui/core";
import MarkdownViewer from "../../components/MarkdownViewer";
import PostHeader from "../../components/PostHeader";
import PostEditor from "../../components/PostEditor";

interface Props {
  username: string;
  body: string;
  title: string;
  id: string;
  server: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.secondary.main,
    textAlign: "left",
  },
}));

const Post = (props: Props): ReactElement => {
  const [editorOpen, setEditorOpen] = useState(false);
  const classes = useStyles();

  const content = editorOpen ? (
    <PostEditor
      body={props.body}
      title={props.title}
      server={props.server}
      id={props.id}
      submitButtonText="Save Post"
      onSuccess={() => setEditorOpen(false)}
      onCancel={() => setEditorOpen(false)}
    />
  ) : (
    <Grid item xs={12}>
      <Card color="primary" className={classes.card}>
        <PostHeader
          onToggleEdit={() => setEditorOpen(true)}
          title={props.title}
          id={props.id}
          server={props.server}
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
};

export default Post;
