/*
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Robert Mardall
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
import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardContent, Grid, Typography, makeStyles } from "@material-ui/core";
import { PostEditor, PostHeader } from "..";

/**
 * Properties for the [[`PostPreview`]] component.
 *
 * @internal
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
   * Host the post exists on.
   */
  host: string;

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
      host={props.host}
      id={props.id}
      submitButtonText="Save Post"
      onSuccess={() => window.location.assign(window.location.href)}
      onCancel={() => setEditorOpen(false)}
    />
  ) : (
    <Grid item container spacing={2}>
      <Grid item container direction="column" justify="flex-start">
        <Card className={classes.card}>
          <PostHeader
            community={props.community}
            onToggleEdit={() => setEditorOpen(true)}
            title={props.title}
            username={props.username}
            id={props.id}
            host={props.host}
            isPreview
          />
          <CardActionArea
            disableRipple
            component={RouterLink}
            to={`/instances/${props.host}/communities/${props.community}/posts/${props.id}`}
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
