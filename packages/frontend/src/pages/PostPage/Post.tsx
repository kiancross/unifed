/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import MarkdownViewer from "../../components/MarkdownViewer";
import style from "./PostPage.module.scss";
import PostHeader from "../../components/PostHeader";
import PostEditor from "../../components/PostHeader/PostEditor";

interface PostValues {
  username: string;
  body: string;
  title: string;
  id: string;
  server: string;
}

const Post = (props: PostValues): JSX.Element => {
  const [editorOpen, setEditorOpen] = useState(false);

  const content = editorOpen ? (
    <div>
      <PostEditor
        onClose={() => setEditorOpen(false)}
        body={props.body}
        title={props.title}
        server={props.server}
        id={props.id}
      />
    </div>
  ) : (
    <Grid item xs={12}>
      <Card style={{ textAlign: "left" }}>
        <PostHeader
          onToggleEdit={() => setEditorOpen(true)}
          body={props.body}
          title={props.title}
          id={props.id}
          server={props.server}
          username={props.username}
        />
        <CardContent className={style.cardContent}>
          <Typography variant="h6">{props.title ? props.title : "Comment"}</Typography>
          <Typography variant="body2">
            <MarkdownViewer>{props.body}</MarkdownViewer>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return content;
};

export default Post;
