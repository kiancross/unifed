/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Box, Card, CardContent, Grid, Typography, GridSize } from "@material-ui/core";
import UserIcon from "../../components/UserIcon";
import MarkdownViewer from "../../components/MarkdownViewer";
import PostHeader from "../../components/PostHeader";
import PostEditor from "../../components/PostEditor";

interface PostValues {
  username: string;
  body: string;
  id: string;
  grids: GridSize;
  host: string;
}

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: "4px 0px",
  },
  header: {
    textAlign: "left",
    background: theme.palette.secondary.main,
  },
  body: {
    marginBottom: "14px",
    marginTop: "14px",
    paddingBottom: 0,
    paddingTop: 0,
  },
}));

const Comment = (props: PostValues): JSX.Element => {
  const theme = useTheme().palette;
  const classes = useStyles();

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
    <Grid item container direction="row-reverse" spacing={2} className={classes.grid}>
      <Grid item xs={props.grids} container direction="column">
        <Box borderLeft={4} borderColor={theme.primary.main}>
          <Card elevation={1} square className={classes.header}>
            <PostHeader
              onToggleEdit={() => setEditorOpen(true)}
              isComment
              username={props.username}
              id={props.id}
              server={props.host}
            />
            <CardContent className={classes.body}>
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
