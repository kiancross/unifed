/*
 * CS3099 Group A3
 */

import { ReactElement, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardContent, Grid, Typography, makeStyles } from "@material-ui/core";
import { PostEditor, PostHeader } from "..";

interface PostValues {
  username: string;
  title: string;
  id: string;
  server: string;
  community: string;
  body: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "left",
    background: theme.palette.secondary.main,
  },
}));

export function PostPreview(props: PostValues): ReactElement {
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
      <Grid item container direction="column" justify="flex-start">
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
