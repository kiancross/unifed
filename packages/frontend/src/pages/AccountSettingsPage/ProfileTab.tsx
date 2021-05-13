/*
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { ReactElement, useContext } from "react";
import { useFormik } from "formik";
import { gql, useMutation } from "@apollo/client";
import { Edit as EditIcon } from "@material-ui/icons";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  makeStyles,
} from "@material-ui/core";

import { UserContext } from "../../contexts";

/**
 * Properties for the [[`ProfileTab`]] component.
 *
 * @internal
 */
export interface ProfileTabProps {
  /**
   * Name of the profile.
   */
  name: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    textAlign: "center",
  },
}));

/**
 * GraphQL query to change the name of a user.
 *
 * @internal
 */
export const changeNameQuery = gql`
  mutation UpdateUserProfile($name: String!) {
    updateUserProfile(profile: { name: $name })
  }
`;

/**
 * Allows users to change their name on the app.
 *
 * @param props Properties passed to the component. See [[`ProfileTabProps`]].
 *
 * @internal
 */
export function ProfileTab(props: ProfileTabProps): ReactElement {
  const [nameOpen, setNameOpen] = React.useState(false);
  const user = useContext(UserContext);

  const handleNameClickOpen = () => {
    setNameOpen(!nameOpen);
  };

  const [changeName, { data }] = useMutation(changeNameQuery);

  if (data?.updateUserProfile) user.refetch();

  function NameChangeForm() {
    const formik = useFormik({
      initialValues: {
        name: "",
      },
      onSubmit: (values) => {
        changeName({ variables: { name: values.name } });
        handleNameClickOpen();
      },
    });
    return (
      <form id="name-form" onSubmit={formik.handleSubmit}>
        <Dialog open={nameOpen} onClose={handleNameClickOpen}>
          <DialogTitle>Change Name</DialogTitle>
          <DialogContent dividers>
            <TextField
              name="name"
              label="New Name"
              required
              fullWidth
              variant="outlined"
              margin="dense"
              inputProps={{ "data-testid": "change-name-input", form: "name-form" }}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </DialogContent>
          <DialogActions>
            <Button data-testid="change-name-submit" form="name-form" color="primary" type="submit">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }

  const classes = useStyles();
  return (
    <List classes={classes}>
      <ListItem>
        <ListItemText primary={props.name} secondary="Name" />
        <ListItemSecondaryAction>
          <IconButton
            data-testid="change-name-button"
            onClick={handleNameClickOpen}
            color="primary"
            edge="end"
          >
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {nameOpen && <NameChangeForm />}
    </List>
  );
}
