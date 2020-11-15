import React from "react";
import { Box, Card, CardContent, Grid, Link, Typography } from "@material-ui/core";
import "fontsource-roboto";
import ReactMarkdown from "react-markdown";
import theme from "../utils/mui-theme";

interface PostValues {
  username: string;
  text: string;
  title: string;
}

const Post = (props: PostValues): JSX.Element => {
  return (
    <Grid item xs={12} container direction="column" justify="flex-start">
      <Box borderColor={theme.palette.primary.main}>
        <Card style={{ textAlign: "left" }}>
          <CardContent>
            <Typography variant="body2" gutterBottom>
              <Link href={"/user/" + props.username}>{props.username}</Link>
            </Typography>
            <Typography variant="h5">{props.title}</Typography>
            <ReactMarkdown>{props.text}</ReactMarkdown>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default Post;
