/*
 * CS3099 Group A3
 */

import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import MarkdownViewer from "../../components/MarkdownViewer";
import style from "./PostPage.module.scss";
import PostHeader from "../../components/PostHeader";

interface PostValues {
  username: string;
  text: string;
  title: string;
}

const Post = (props: PostValues): JSX.Element => {
  return (
    <Grid item xs={12}>
      <Card style={{ textAlign: "left" }}>
        <PostHeader username={props.username} />
        <CardContent className={style.cardContent}>
          <Typography variant="h6">{props.title ? props.title : "Comment"}</Typography>
          <Typography variant="body2">
            <MarkdownViewer>{props.text}</MarkdownViewer>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Post;
