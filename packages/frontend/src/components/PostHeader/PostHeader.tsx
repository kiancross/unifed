import React, { useState, useContext } from "react";
import { CardHeader, IconButton, Menu, MenuItem, Typography, Link } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { gql, useMutation } from "@apollo/client";
import CenteredLoader from "../CenteredLoader";
import ErrorPage from "../../pages/ErrorPage";
import { Redirect } from "react-router";
import { UserContext } from "../../components/App/UserContext";

interface PropsTypes {
  username: string;
  id: string;
  server: string;
  title?: string;
  isComment?: boolean;
  isPreview?: boolean;
  onToggleEdit: () => void;
}

const PostHeader = (props: PropsTypes): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const loggedInUser = useContext(UserContext);

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
    } else if (props.isPreview) {
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
    handleClose();
    props.onToggleEdit();
  };

  const handleDelete = () => {
    handleClose();
    deletePost({ variables: { id: props.id, host: props.server } });
  };

  const headerAction =
    loggedInUser == props.username ? (
      <div>
        <IconButton color="inherit" edge="end" size="small" onClick={(e) => handleClick(e)}>
          <MoreHorizIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleEdit}> Edit </MenuItem>
          <MenuItem onClick={handleDelete}> Delete </MenuItem>
        </Menu>
      </div>
    ) : null;

  const headerTitle = props.isComment ? (
    <Typography variant="body2" gutterBottom>
      <Link href={"/user/" + props.username}>{props.username}</Link>
      &nbsp; &#8212; &nbsp;
      <Link href={props.id}>View Replies</Link>
    </Typography>
  ) : (
    <Typography variant="body2">
      <Link href={"/user/" + props.username}>{props.username}</Link>
    </Typography>
  );

  return <CardHeader action={headerAction} title={headerTitle} />;
};

export default PostHeader;
