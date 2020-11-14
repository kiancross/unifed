import React from "react";
import { Button, Grid } from "@material-ui/core";

const MakePostButton = (): JSX.Element => {
  return (
    <Grid item>
      <Button fullWidth color="primary" variant="contained" href="/make-post">
        {" "}
        Make Post{" "}
      </Button>
    </Grid>
  );
};

export default MakePostButton;
