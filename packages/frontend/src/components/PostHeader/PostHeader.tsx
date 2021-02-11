/*
 * CS3099 Group A3
 */

import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { CardHeader, IconButton, Menu, MenuItem, Typography, Link } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { gql, useMutation } from "@apollo/client";
import CenteredLoader from "../CenteredLoader";
import ErrorMessage from "../ErrorMessage";
import UserContext from "../UserContext";
import styles from "./PostHeader.module.scss";

interface PropsTypes {
  username: string;
  id: string;
  server: string;
  title?: string;
  isComment?: boolean;
  isPreview?: boolean;
  onToggleEdit: () => void;
}

export const DELETE_POST = gql`
  mutation($id: String!, $host: String!) {
    deletePost(post: { id: $id, host: $host })
  }
`;

const PostHeader = (props: PropsTypes): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const loggedInUser = useContext(UserContext);

  const [deletePost, { loading, data, error }] = useMutation(DELETE_POST);

  if (loading) return <CenteredLoader />;
  if (error) return <ErrorMessage message="Post could not be deleted." />;
  if (data) {
    if (props.isComment || props.isPreview) {
      window.location.assign(window.location.href);
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
    loggedInUser === props.username && props.server === "this" ? (
      <React.Fragment>
        <IconButton
          data-testid="icon-button"
          color="inherit"
          edge="end"
          size="small"
          onClick={(e) => handleClick(e)}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}> Edit </MenuItem>
          <MenuItem onClick={handleDelete}> Delete </MenuItem>
        </Menu>
      </React.Fragment>
    ) : null;

  const headerTitle = props.isComment ? (
    <Typography variant="body2">
      <Link href={"/user/" + props.username}>{props.username}</Link>
      &nbsp; &#8212; &nbsp;
      <Link href={props.id}>View Replies</Link>
    </Typography>
  ) : (
    <Typography variant="body2">
      <Link href={"/user/" + props.username}>{props.username}</Link>
    </Typography>
  );

  return (
    <CardHeader
      className={props.isComment ? styles.commentHeader : ""}
      action={headerAction}
      title={headerTitle}
    />
  );
};

export default PostHeader;
