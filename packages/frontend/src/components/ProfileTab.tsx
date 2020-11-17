import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useFormik } from "formik";
import { gql, useMutation } from "@apollo/client";

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

  const handleNameClickOpen = () => {
    setNameOpen(!nameOpen);
  };

  const [changeName, { data }] = useMutation(CHANGE_NAME);

  if (data) window.location.reload();

  const NameChangeForm = (): JSX.Element => {
    const formik = useFormik({
      initialValues: {
        name: "",
      },
      onSubmit: (values) => {
        changeName({ variables: { name: values.name } });
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="name"
          inputProps={{ "data-testid": "name" }}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <Button type="submit">Update</Button>
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
