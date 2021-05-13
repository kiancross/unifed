/*
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Robert Mardall
 * Copyright (C) 2021 Lewis Mazzei
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
import { MarkdownViewer, PostHeader, PostEditor, PostCreator } from "..";

/**
 * Properties for the [[`Comment`]] component.
 *
 * @internal
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
   * Host the comment is located on.
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
  action: {
    padding: "0px 16px 16px 16px",
  },
  replyButton: {
    padding: "4px",
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
      host={props.host}
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
      host={props.host}
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
                host={props.host}
              />
              <CardContent className={classes.body}>
                <Typography variant="subtitle2">
                  <MarkdownViewer>{props.body}</MarkdownViewer>
                </Typography>
              </CardContent>
              <CardActions className={classes.action}>
                <IconButton
                  className={classes.replyButton}
                  onClick={() => setMakingReply(true)}
                  aria-label="reply"
                >
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
