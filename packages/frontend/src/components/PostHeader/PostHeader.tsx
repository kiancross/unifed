import React from "react";
import { CardHeader, IconButton, Menu, MenuItem, Typography, Link } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { gql, useMutation } from "@apollo/client";
import CenteredLoader from "../CenteredLoader";
import ErrorPage from "../../pages/ErrorPage";
import { Redirect } from "react-router";

interface PropsTypes {
  username: string;
  id: string;
  host: string;
}

const PostHeader = (props: PropsTypes): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & Element) | null>(null);

  const DELETE_POST = gql`
    mutation($id: String!, $host: String!) {
      deletePost(post: { id: $id, host: $host })
    }
  `;

  /*
  const EDIT_POST = gql`
    mutation($id: String!, $host: String!, $body: String!, $title: String!) {
      updatePost(content: { body: $body, title: $title }, post: { id: $id, host: $host })
    }
  `;

  const [editPost, { loading: editLoading, data: editData, error: editError }] = useMutation(
    EDIT_POST,
  );
    */

  const [
    deletePost,
    { loading: deleteLoading, data: deleteData, error: deleteError },
  ] = useMutation(DELETE_POST);
  if (deleteLoading) return <CenteredLoader />;
  if (deleteError) return <ErrorPage message="Post could not be deleted." />;
  if (deleteData) return <Redirect to="/" />;

  const handleClick = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    //open editor and make mutation using host and id
    //reload page
    console.log("edit");
    handleClose();
  };

  const handleDelete = () => {
    deletePost({ variables: { id: props.id, host: props.host } });
  };

  return (
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
        <Typography variant="h5">
          <Link href={"/user/" + props.username}>{props.username}</Link>
        </Typography>
      }
    />
  );
};

export default PostHeader;
