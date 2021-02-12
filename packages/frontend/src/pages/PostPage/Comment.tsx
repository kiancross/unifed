/*
 * CS3099 Group A3
 */

import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Box, Card, CardContent, Grid, Typography, Button } from "@material-ui/core";
import UserIcon from "../../components/UserIcon";
import MarkdownViewer from "../../components/MarkdownViewer";
import PostHeader from "../../components/PostHeader";
import PostEditor from "../../components/PostEditor";

interface PostValues {
  username: string;
  body: string;
  title: string;
  id: string;
  host: string;
}

const styles = {
  cardcontent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
};

const Comment = (props: PostValues): JSX.Element => {
  const theme = useTheme().palette;
  const [editorOpen, setEditorOpen] = useState(false);

  const content = editorOpen ? (
    <>
      <PostEditor
        server={props.host}
        id={props.id}
        body={props.body}
        submitButtonText="Save Comment"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        style={{ marginTop: "8px" }}
        onClick={() => setEditorOpen(false)}
      />
    </>
  ) : (
    <Grid item container direction="row-reverse" spacing={2}>
      <Grid item xs={11} container direction="column">
        <Box borderLeft={4} borderColor={theme.primary.main}>
          <Card
            elevation={1}
            square
            style={{ background: theme.secondary.main, textAlign: "left" }}
          >
            <PostHeader
              onToggleEdit={() => setEditorOpen(true)}
              isComment
              username={props.username}
              id={props.id}
              server={props.host}
            />
            <CardContent style={styles.cardcontent}>
              <Typography variant="body2">
                <MarkdownViewer>{props.body}</MarkdownViewer>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={1} container justify="flex-end">
        <Box paddingTop="1rem">
          <UserIcon username={props.username} small />
        </Box>
      </Grid>
    </Grid>
  );

  return content;
};

export default Comment;
