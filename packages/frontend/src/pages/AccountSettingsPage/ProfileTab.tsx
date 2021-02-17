/*
 * CS3099 Group A3
 */

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
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useContext } from "react";
import { useFormik } from "formik";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../../contexts/user";

interface ProfileTabParams {
  name: string;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ffffff",
    color: "#000000",
    textAlign: "center",
  },
});

const CHANGE_NAME = gql`
  mutation UpdateUserProfile($name: String!) {
    updateUserProfile(profile: { name: $name })
  }
`;

const ProfileTab = (props: ProfileTabParams): JSX.Element => {
  const [nameOpen, setNameOpen] = React.useState(false);
  const user = useContext(UserContext);

  const handleNameClickOpen = () => {
    setNameOpen(!nameOpen);
  };

  const [changeName, { data }] = useMutation(CHANGE_NAME);

  if (data) user.refetch();

  const NameChangeForm = (): JSX.Element => {
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
              inputProps={{ "data-testid": "name", form: "name-form" }}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </DialogContent>
          <DialogActions>
            <Button form="name-form" color="primary" type="submit">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  };

  const classes = useStyles();
  return (
    <List classes={classes}>
      <ListItem>
        <ListItemText primary={props.name} secondary="Name" />
        <ListItemSecondaryAction>
          <IconButton
            id="change-name-button"
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
};

export default ProfileTab;
