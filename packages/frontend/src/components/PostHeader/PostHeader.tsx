import React, { useState } from "react";
import {
  Button,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Link,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { gql, useMutation } from "@apollo/client";
import CenteredLoader from "../CenteredLoader";
import ErrorPage from "../../pages/ErrorPage";
import { Redirect } from "react-router";
import PostEditor from "./PostEditor";
import CommentEditor from "./CommentEditor";

interface PropsTypes {
  username: string;
  id: string;
  host: string;
  isComment: boolean;
  title: string;
  body: string;
}

const PostHeader = (props: PropsTypes): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const DELETE_POST = gql`
    mutation($id: String!, $host: String!) {
      deletePost(post: { id: $id, host: $host })
    }
  `;

  const [
    deletePost,
    { loading: deleteLoading, data: deleteData, error: deleteError },
  ] = useMutation(DELETE_POST);
  if (deleteLoading) return <CenteredLoader />;
  if (deleteError) return <ErrorPage message="Post could not be deleted." />;
  if (deleteData) {
    if (props.isComment) {
      window.location.reload();
    } else {
      return <Redirect to="/" />;
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditorOpen(true);
    console.log("edit");
    handleClose();
  };

  const handleDelete = () => {
    deletePost({ variables: { id: props.id, host: props.host } });
  };

  const chosenEditor = props.isComment ? (
    <CommentEditor server={props.host} id={props.id} body={props.body} />
  ) : (
    <PostEditor body={props.body} title={props.title} server={props.host} id={props.id} />
  );

  const editor = editorOpen ? (
    <div style={{ paddingTop: "7px" }}>
      {chosenEditor}{" "}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        style={{ marginTop: "8px" }}
        onClick={() => setEditorOpen(false)}
      >
        Cancel
      </Button>{" "}
    </div>
  ) : null;

  return (
    <div>
      {editor}
      <CardHeader
        action={
          <div>
            <IconButton color="inherit" edge="end" size="small" onClick={(e) => handleClick(e)}>
              <MoreHorizIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleEdit}> Edit </MenuItem>
              <MenuItem onClick={handleDelete}> Delete </MenuItem>
            </Menu>
          </div>
        }
        title={
          props.isComment ? (
            <Typography variant="body2" gutterBottom>
              <Link href={"/user/" + props.username}>{props.username}</Link>
              &nbsp; &#8212; &nbsp;
              <Link href={props.id}>View Replies</Link>
            </Typography>
          ) : (
            <Typography variant="h5">
              <Link href={"/user/" + props.username}>{props.username}</Link>
            </Typography>
          )
        }
      />
    </div>
  );
};

export default PostHeader;
