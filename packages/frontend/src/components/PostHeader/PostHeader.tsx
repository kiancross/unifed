/*
 * CS3099 Group A3
 */

import React, { useState, useContext, ReactElement } from "react";
import { Redirect } from "react-router-dom";
import {
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Theme,
  makeStyles,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { gql, useMutation, Reference, useQuery } from "@apollo/client";
import { UserContext } from "../../contexts";
import { Link, ErrorMessage, CenteredLoader } from "..";
import { UserIcon } from "../UserIcon";

interface Props {
  username: string;
  id: string;
  server: string;
  title?: string;
  parent?: string;
  isPreview?: boolean;
  onToggleEdit: () => void;
  community: string;
}

const useStyles = makeStyles<Theme, Props>({
  header: (props) => (props.parent ? { paddingBottom: "0" } : {}),
});

export const getAdminsQuery = gql`
  query($id: String!, $host: String!) {
    getCommunity(community: { id: $id, host: $host }) {
      admins {
        id
        host
      }
    }
  }
`;

export const deletePostQuery = gql`
  mutation($id: String!, $host: String!) {
    deletePost(post: { id: $id, host: $host })
  }
`;

export const reportPostQuery = gql`
  mutation($id: String!, $host: String!) {
    reportPost(post: { id: $id, host: $host })
  }
`;

export function PostHeader(props: Props): ReactElement {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const user = useContext(UserContext);
  const classes = useStyles(props);
  const unapprovedBody = "This post is pending approval.";

  const updateCacheDelete = {
    update: (cache: any, { data: { deletePost } }: any) => {
      if (deletePost) {
        cache.modify({
          fields: {
            getPosts(existingPosts: Reference[], { readField }: any) {
              return existingPosts.filter((post) => props.id !== readField("id", post));
            },
          },
        });

        if (props.parent) {
          cache.modify({
            id: `Post:${props.parent}`,
            fields: {
              children(existingChildren: Reference[], { readField }: any) {
                return existingChildren.filter((child) => props.id !== readField("id", child));
              },
            },
          });
        }
      }
    },
  };

  const updateCacheReport = {
    update: (cache: any, { data: { reportPost } }: any) => {
      if (reportPost) {
        cache.modify({
          id: `Post:${props.id}`,
          fields: {
            body: () => unapprovedBody,
            approved: () => false,
          },
        });
      }
    },
  };

  const { data: adminData, loading: adminLoading, error: adminError } = useQuery(getAdminsQuery, {
    variables: { id: props.community, host: props.server },
  });

  const [
    deletePost,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(deletePostQuery, updateCacheDelete);

  const [reportPost, { loading: reportLoading, error: reportError }] = useMutation(
    reportPostQuery,
    updateCacheReport,
  );

  if (deleteLoading || adminLoading || reportLoading) return <CenteredLoader />;
  if (deleteError) return <ErrorMessage message="Post could not be deleted." />;
  if (adminError) return <ErrorMessage message="Admins for the community could not be retrieved" />;
  if (reportError) return <ErrorMessage message="Post could not be reported." />;

  if (deleteData) {
    if (!props.parent && !props.isPreview) {
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

  const handleReport = () => {
    handleClose();
    reportPost({ variables: { id: props.id, host: props.server } });
  };

  const isUserAdmin = adminData.getCommunity.admins.some(
    (admin: any) => admin.id === user.details?.username,
    //need to check host is "this"
    //&& admin.host === "this"
  );

  const headerAction =
    (!!user.details || isUserAdmin) && props.server === process.env.REACT_APP_INTERNAL_REFERENCE ? (
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
          {user.details?.username === props.username ? (
            <div>
              <MenuItem onClick={handleEdit}> Edit </MenuItem>
              <MenuItem onClick={handleDelete}> Delete </MenuItem>
            </div>
          ) : isUserAdmin ? (
            <div>
              <MenuItem onClick={handleEdit}> Edit </MenuItem>
              <MenuItem onClick={handleDelete}> Delete </MenuItem>
              <MenuItem onClick={handleReport}> Report </MenuItem>
            </div>
          ) : (
            <MenuItem onClick={handleReport}> Report </MenuItem>
          )}
        </Menu>
      </React.Fragment>
    ) : null;

  const headerTitle = (
    <Typography variant="body2" gutterBottom={props.parent == undefined}>
      <Link to={"/user/" + props.username} color="inherit">
        {props.username}
      </Link>
    </Typography>
  );

  return (
    <CardHeader
      avatar={<UserIcon small username={props.username} />}
      className={classes.header}
      action={headerAction}
      title={headerTitle}
    />
  );
}
