import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

interface AccountTabParams {
  username: string;
  email: string;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ffffff",
    color: "#000000",
  },
});

const AccountTab = (props: AccountTabParams): JSX.Element => {
  const [passOpen, setPassOpen] = React.useState(false);

  const handlePassClickOpen = () => {
    setPassOpen(true);
  };

  const handleClose = () => {
    setPassOpen(false);
  };

  const PassResetDialog = (): JSX.Element => {
    return (
      <Dialog open={passOpen} onClose={handleClose}>
        <DialogTitle>Update your password</DialogTitle>
        <DialogContent>
          <DialogContentText>Password must contain letters, numbers and symbols</DialogContentText>
          <TextField fullWidth required label="Old Password" />
          <TextField fullWidth required label="New Password" />
          <TextField fullWidth required label="Confirm New Password" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <ListItemText primary={props.username} secondary="Username" />
        </ListItem>
        <ListItem>
          <ListItemText primary={props.email} secondary="Email" />
        </ListItem>
        <ListItem>
          <ListItemText primary="***" secondary="Password" />
          <ListItemSecondaryAction>
            <IconButton onClick={handlePassClickOpen} color="primary" edge="end">
              <EditIcon />
            </IconButton>
            <PassResetDialog />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
};

export default AccountTab;
