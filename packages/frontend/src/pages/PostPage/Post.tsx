/*
 * CS3099 Group A3
 */

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@material-ui/core";
import MarkdownViewer from "../../components/MarkdownViewer";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import style from "./PostPage.module.scss";

interface PostValues {
  username: string;
  text: string;
  title: string;
}

const Post = (props: PostValues): JSX.Element => {
  //const [menuOpen, setMenuOpen] = React.useState(null);
  //const open = Boolean(menuOpen);

  const handleClick = () => {
    console.log("clicked");
  };
  /*
  const handleClose = () => {
    setMenuOpen(null);
  };*/

  return (
    <Grid item xs={12}>
      <Card style={{ textAlign: "left" }}>
        <CardHeader
          action={
            <IconButton color="inherit" edge="end" size="small" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography variant="h5" gutterBottom>
              <Link href={"/user/" + props.username}>{props.username}</Link>
            </Typography>
          }
        />
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
