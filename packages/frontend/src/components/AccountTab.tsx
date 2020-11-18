import React from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import { useFormik } from "formik";
import { passwordClient } from "../utils/accounts";

interface AccountTabParams {
  username: string;
  email: string;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ffffff",
    color: "#000000",
    textAlign: "center",
  },
});

const AccountTab = (props: AccountTabParams): JSX.Element => {
  const [passOpen, setPassOpen] = React.useState(false);

  const handlePassClickOpen = () => {
    setPassOpen(!passOpen);
  };

  const PassChangeForm = (): JSX.Element => {
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
              alert("Password Changed Successfully");
            })
            .catch(() => {
              alert("Password Change Failed");
            });
        }
      },
    });
    const fieldStyle = { width: "55%" };
    return (
      <form onSubmit={formik.handleSubmit}>
        <TextField
          type="password"
          size="small"
          label="Old Password"
          style={fieldStyle}
          name="oldPassword"
          inputProps={{ "data-testid": "old-password" }}
          onChange={formik.handleChange}
          value={formik.values.oldPassword}
        />
        <TextField
          type="password"
          size="small"
          label="New Password"
          style={fieldStyle}
          fullWidth
          name="newPassword"
          inputProps={{ "data-testid": "new-password" }}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
        />
        <TextField
          type="password"
          size="small"
          label="Confirm Password"
          style={fieldStyle}
          fullWidth
          name="confirmPassword"
          inputProps={{ "data-testid": "confirm-password" }}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        <br />
        <Button type="submit">Change</Button>
      </form>
    );
  };

  const classes = useStyles();
  return (
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
            id="change-password-button"
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
  );
};

export default AccountTab;
