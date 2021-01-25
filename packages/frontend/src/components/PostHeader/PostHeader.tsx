import React from "react";
import style from "./PostHeader.module.scss";
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

  const [deletePost, { loading, data, error }] = useMutation(DELETE_POST);
  if (loading) return <CenteredLoader />;
  if (error) return <ErrorPage message="Post could not be deleted." />;
  if (data) return <Redirect to="/" />;

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
      className={style.cardHeader}
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
        <Typography variant="h5" gutterBottom>
          <Link href={"/user/" + props.username}>{props.username}</Link>
        </Typography>
      }
    />
  );
};

export default PostHeader;
