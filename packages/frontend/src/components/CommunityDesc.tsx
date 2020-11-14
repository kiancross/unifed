import React from "react";
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from "@material-ui/core";

interface Props {
  desc: string;
}

const CommunityDesc = (props: Props): JSX.Element => {
  return (
    <Grid item>
      <Card>
        <CardHeader subheader="About" />
        <Divider />
        <Grid container>
          <CardContent>
            <Typography variant="body2">{props.desc}</Typography>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CommunityDesc;
