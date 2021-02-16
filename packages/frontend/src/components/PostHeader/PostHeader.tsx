/*
 * CS3099 Group A3
 */

import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { CardHeader, IconButton, Menu, MenuItem, Typography, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../../contexts/user";
import CenteredLoader from "../CenteredLoader";
import ErrorMessage from "../ErrorMessage";
import { Link } from "../../components/Links";

interface Props {
  username: string;
  id: string;
  server: string;
  title?: string;
  isComment?: boolean;
  isPreview?: boolean;
  onToggleEdit: () => void;
}

const useStyles = makeStyles<Theme, Props>({
  header: (props) => (props.isComment ? { paddingBottom: "0" } : {}),
});

export const DELETE_POST = gql`
  mutation($id: String!, $host: String!) {
    deletePost(post: { id: $id, host: $host })
  }
`;

const PostHeader = (props: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const user = useContext(UserContext);
  const classes = useStyles(props);

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
    user.details?.username === props.username &&
    props.server === process.env.REACT_APP_INTERNAL_REFERENCE ? (
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
    <Typography variant="body2" gutterBottom>
      <Link to={"/user/" + props.username} color="inherit">
        {props.username}
      </Link>
      &nbsp; &#8212; &nbsp;
      <Link color="inherit" to={props.id}>
        View Replies
      </Link>
    </Typography>
  ) : (
    <Typography variant="body2">
      <Link color="inherit" to={"/user/" + props.username}>
        {props.username}
      </Link>
    </Typography>
  );

  return <CardHeader className={classes.header} action={headerAction} title={headerTitle} />;
};

export default PostHeader;
