import React from "react";
import { Box, Card, CardActionArea, CardContent, Typography } from "@material-ui/core";

interface AccountTabParams {
  email: string;
}

const AccountTab = (props: AccountTabParams): JSX.Element => {
  return (
    <Box borderRadius="borderRadius" textAlign="left" bgcolor="secondary.main" m={1}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Email address
            </Typography>
            <Typography>{props.email}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Password
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default AccountTab;
