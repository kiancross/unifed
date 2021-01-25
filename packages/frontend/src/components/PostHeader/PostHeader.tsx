import React from "react";
import style from "./PostHeader.module.scss";
import { CardHeader, IconButton, Menu, MenuItem, Typography, Link } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

interface PropsTypes {
  username: string;
}

const PostHeader = (props: PropsTypes): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & Element) | null>(null);

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
    //call mutation using id and host
    //delete comments?
    //go to community page
    console.log("delete");
    handleClose();
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
