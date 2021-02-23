/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import {
  Button,
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";

const useStyles = makeStyles({
  fullHeight: {
    height: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  instructions: {
    textAlign: "center",
  },
});

const JoinCallMessage = (props: { onJoinClick: () => void }): ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.fullHeight}
    >
      <Grid item container className={classes.fullHeight} justify="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className={classes.fullWidth}>
            <CardContent>
              <Typography variant="body1" className={classes.instructions}>
                Clicking the 'Join Community Call' button will prompt you to allow Unifed to access
                your microphone and camera. We need this to let you chat with other people in the
                community! If you say 'No', you will still be able to hear and see other users, but
                they will not be able to hear or see you.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={props.onJoinClick}
                className={classes.fullWidth}
              >
                Join Community Call
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default JoinCallMessage;
