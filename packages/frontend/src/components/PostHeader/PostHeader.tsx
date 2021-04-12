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

/**
 * Properties for the [[`PostHeader`]] component.
 * 
 * @internal
 */
export interface PostHeaderProps {
  /**
   * Author of the post.
   */
  username: string;

  /**
   * ID of the post.
   */
  id: string;

  /**
   * Host the post exists on.
   */
  host: string;

  /**
   * Title of the post. This is `undefined` for comments.
   */
  title?: string;

  /**
   * ID of the parent if this is the header of a comment.
   */
  parent?: string;

  /**
   * Indicates whether the post is being used as a preview.
   */
  isPreview?: boolean;

  /**
   * Function to be called when the edit button is clicked.
   */
  onToggleEdit: () => void;

  /**
   * Community that the post belongs to.
   */
  community: string;
}

const useStyles = makeStyles<Theme, PostHeaderProps>({
  header: (props) => (props.parent ? { paddingBottom: "0" } : {}),
});

/**
 * GraphQL query to retrieve the IDs and hosts of the admins of the community the post is a part of.
 * 
 * @internal
 */
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

/**
 * GraphQL query to delete the post with the given id on the given host.
 * 
 * @internal
 */
export const deletePostQuery = gql`
  mutation($id: String!, $host: String!) {
    deletePost(post: { id: $id, host: $host })
  }
`;

/**
 * Used to display the user icon, title and actions that can be taken on a post or comment.
 *
 * Outline:
 *
 *  - The user's icon is displayed on the left of the header
 *
 *  - The title of the post is displayed in the middle of the header.
 *    Nothing is displayed for the title of comments, as they do not have one.
 *
 *  - Users who have made the post or administrators of the community the post is a
 *    part of can edit or delete the post by selecting the desired option from a dropdown.
 *
 * @param props Properties passed to the component. See [[`PostHeaderProps`]].
 *
 * @internal
 */
export function PostHeader(props: PostHeaderProps): ReactElement {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const user = useContext(UserContext);
  const classes = useStyles(props);

  const { data: adminData, loading: adminLoading, error: adminError } = useQuery(getAdminsQuery, {
    variables: { id: props.community, host: props.host },
  });

  const [deletePost, { data, loading, error }] = useMutation(deletePostQuery, {
    update: (cache) => {
      cache.modify({
        fields: {
          getPosts(existingPosts: Reference[], { readField }) {
            return existingPosts.filter((post) => props.id !== readField("id", post));
          },
        },
      });

      if (props.parent) {
        cache.modify({
          id: `Post:${props.parent}`,
          fields: {
            children(existingChildren: Reference[], { readField }) {
              return existingChildren.filter((child) => props.id !== readField("id", child));
            },
          },
        });
      }
    },
  });

  if (loading || adminLoading) return <CenteredLoader />;
  if (error) return <ErrorMessage message="Post could not be deleted." />;
  if (adminError) return <ErrorMessage message="Admins for the community could not be retrieved" />;

  if (data) {
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
    deletePost({ variables: { id: props.id, host: props.host } });
  };

  const isUserAdmin = adminData.getCommunity.admins.some(
    (admin: any) => admin.id === user.details?.username,
    //need to check host is "this"
    //&& admin.host === "this"
  );

  const headerAction =
    (user.details?.username === props.username || isUserAdmin) &&
    props.host === process.env.REACT_APP_INTERNAL_REFERENCE ? (
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
