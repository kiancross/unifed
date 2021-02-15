/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Box, Card, CardContent, Grid, Typography, GridSize } from "@material-ui/core";
import UserIcon from "../../components/UserIcon";
import MarkdownViewer from "../../components/MarkdownViewer";
import PostHeader from "../../components/PostHeader";
import PostEditor from "../../components/PostEditor";
import style from "./PostPage.module.scss";

interface PostValues {
  username: string;
  body: string;
  id: string;
  grids: GridSize;
  host: string;
}

const Comment = (props: PostValues): JSX.Element => {
  const theme = useTheme();
  const [editorOpen, setEditorOpen] = useState(false);

  const content = editorOpen ? (
    <PostEditor
      server={props.host}
      id={props.id}
      body={props.body}
      submitButtonText="Save Comment"
      onSuccess={() => setEditorOpen(false)}
      onCancel={() => setEditorOpen(false)}
    />
  ) : (
    <Grid item container direction="row-reverse" style={{ padding: "4px 0px" }}>
      <Grid item xs={props.grids} container direction="column">
        <Box borderLeft={4} borderColor={theme.palette.primary.main}>
          <Card elevation={1} square style={{ textAlign: "left" }}>
            <PostHeader
              onToggleEdit={() => setEditorOpen(true)}
              isComment
              username={props.username}
              id={props.id}
              server={props.host}
            />
            <CardContent className={style.commentBody}>
              <Typography variant="subtitle2">
                <MarkdownViewer>{props.body}</MarkdownViewer>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={1} container justify="flex-end">
        <Box paddingTop="0.5rem" paddingRight="0.5rem">
          <UserIcon username={props.username} small />
        </Box>
      </Grid>
    </Grid>
  );

  return content;
};

export default Comment;
