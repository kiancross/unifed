/*
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Robert Mardall
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

import React, { ReactElement } from "react";
import { useFormik } from "formik";
import { Alert } from "@material-ui/lab";
import { Edit as EditIcon } from "@material-ui/icons";

import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Snackbar,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";

import { passwordClient } from "../../helpers";

/**
 * Properties for the [[`AccountTab`]] component.
 *
 * @internal
 */
export interface AccountTabProps {
  /**
   * Username of the account.
   */
  username: string;

  /**
   * Email of the account.
   */
  email: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    textAlign: "center",
  },
}));

/**
 * Allows users to view their username, email and change their password.
 *
 * Outline:
 *
 *  - If password change is successful, the password is updated.
 *
 *  - Otherwise, an error message is displayed.
 *
 * @param props Properties passed to the component. See [[`AccountTabProps`]].
 *
 * @internal
 */
export function AccountTab(props: AccountTabProps): ReactElement {
  const [passOpen, setPassOpen] = React.useState(false);
  const [displayError, setDisplayError] = React.useState(false);
  const [displaySuccess, setDisplaySuccess] = React.useState(false);

  const handlePassClickOpen = () => {
    setPassOpen(!passOpen);
  };

  function PassChangeForm() {
    const formik = useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      onSubmit: (values) => {
        if (values.newPassword === values.confirmPassword) {
          passwordClient
            .changePassword(values.oldPassword, values.newPassword)
            .then(() => {
              setDisplayError(false);
              setDisplaySuccess(true);
            })
            .catch(() => {
              setDisplayError(true);
              setDisplaySuccess(false);
            });
          handlePassClickOpen();
        }
      },
    });
    return (
      <form id="pass-change-form" onSubmit={formik.handleSubmit}>
        <Dialog open={passOpen} onClose={handlePassClickOpen}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent dividers>
            <TextField
              type="password"
              size="small"
              label="Old Password"
              fullWidth
              margin="dense"
              variant="outlined"
              name="oldPassword"
              inputProps={{ "data-testid": "old-password", form: "pass-change-form" }}
              onChange={formik.handleChange}
              value={formik.values.oldPassword}
            />
            <TextField
              type="password"
              size="small"
              label="New Password"
              fullWidth
              margin="dense"
              variant="outlined"
              name="newPassword"
              inputProps={{ "data-testid": "new-password", form: "pass-change-form" }}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
            />
            <TextField
              type="password"
              size="small"
              label="Confirm Password"
              fullWidth
              margin="dense"
              variant="outlined"
              name="confirmPassword"
              inputProps={{ "data-testid": "confirm-password", form: "pass-change-form" }}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
          </DialogContent>
          <DialogActions>
            <Button data-testid="change-password-submit" form="pass-change-form" type="submit">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }

  const classes = useStyles();
  return (
    <>
      <List classes={classes}>
        <ListItem>
          <ListItemText primary={props.username} secondary="Username" />
        </ListItem>
        <ListItem>
          <ListItemText primary={props.email} secondary="Email" />
        </ListItem>
        <ListItem>
          <ListItemText primary="********" secondary="Password" />
          <ListItemSecondaryAction>
            <IconButton
              data-testid="change-password-button"
              onClick={handlePassClickOpen}
              color="primary"
              edge="end"
            >
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {passOpen && <PassChangeForm />}
      </List>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={displayError}>
        <Alert severity="error">There was an error changing your password</Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={displaySuccess}>
        <Alert severity="success">Password successfully changed</Alert>
      </Snackbar>
    </>
  );
}
