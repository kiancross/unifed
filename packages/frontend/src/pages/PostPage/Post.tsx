/*
 * CS3099 Group A3
 */

import { ReactElement, useState } from "react";
import { Card, CardContent, Grid, Typography, makeStyles } from "@material-ui/core";

import { MarkdownViewer, PostHeader, PostEditor } from "../../components";

interface Props {
  username: string;
  body: string;
  title: string;
  id: string;
  server: string;
  community: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    background: theme.palette.secondary.main,
    textAlign: "left",
  },
}));

export function Post(props: Props): ReactElement {
  const [editorOpen, setEditorOpen] = useState(false);
  const classes = useStyles();

  const content = editorOpen ? (
    <Grid item>
      <PostEditor
        body={props.body}
        title={props.title}
        server={props.server}
        id={props.id}
        submitButtonText="Save Post"
        onSuccess={() => setEditorOpen(false)}
        onCancel={() => setEditorOpen(false)}
      />
    </Grid>
  ) : (
    <Grid item>
      <Card color="primary" className={classes.card}>
        <PostHeader
          community={props.community}
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
}
