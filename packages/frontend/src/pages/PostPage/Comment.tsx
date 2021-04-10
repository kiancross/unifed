/*
 * CS3099 Group A3
 */

import { ReactElement, useState } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  GridSize,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { Reply as ReplyIcon } from "@material-ui/icons";
import { MarkdownViewer, PostHeader, PostEditor, PostCreator } from "../../components";

/**
 * Properties for the [[`Comment`]] component.
 */
export interface CommentProps {
  /**
   * Username of the author of the comment.
   */
  username: string;

  /**
   * Body of the comment.
   */
  body: string;

  /**
   * ID of the comment.
   */
  id: string;

  /**
   * ID of the post the comment is being made on, or the comment it is replying to.
   */
  parent: string;

  /**
   * How wide the comment should be. This is based on how nested it is.
   */
  grids: GridSize;

  /**
   * Server the comment is located on.
   */
  host: string;

  /**
   * Community the comment is in.
   */
  community: string;
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

/**
 * Displays a comment to the user.
 *
 * Outline:
 *
 *  - The body of the comment is shown, along with a 'reply' button that opens a [[`PostCreator`]].
 *
 *  - The author or admin of the community the comment is a part of can edit or delete the comment through its [[`PostHeader`]].
 *
 * @param props Properties passed to the component. See [[`CommentProps`]].
 *
 * @internal
 */
export function Comment(props: CommentProps): ReactElement {
  const theme = useTheme();
  const classes = useStyles();

  const [editorOpen, setEditorOpen] = useState(false);
  const [makingReply, setMakingReply] = useState(false);

  const replyEditor = makingReply ? (
    <PostCreator
      server={props.host}
      community={props.community}
      submitButtonText="Make Reply"
      parentId={props.id}
      onSuccess={() => setMakingReply(false)}
      isComment
      onCancel={() => setMakingReply(false)}
    />
  ) : null;

  const content = editorOpen ? (
    <PostEditor
      server={props.host}
      id={props.id}
      body={props.body}
      submitButtonText="Save Comment"
      isComment={true}
      onSuccess={() => setEditorOpen(false)}
      onCancel={() => setEditorOpen(false)}
    />
  ) : (
    <Grid item container direction="column" className={classes.grid}>
      <Grid item container direction="row-reverse" spacing={2} className={classes.grid}>
        <Grid item xs={props.grids} container direction="column">
          <Box borderLeft={4} borderColor={theme.palette.primary.main}>
            <Card elevation={1} square className={classes.header}>
              <PostHeader
                community={props.community}
                onToggleEdit={() => setEditorOpen(true)}
                parent={props.parent}
                username={props.username}
                id={props.id}
                server={props.host}
              />
              <CardContent className={classes.body}>
                <Typography variant="subtitle2">
                  <MarkdownViewer>{props.body}</MarkdownViewer>
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => setMakingReply(true)}>
                  <ReplyIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
      {replyEditor}
    </Grid>
  );

  return content;
}
