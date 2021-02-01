/*
 * CS3099 Group A3
 */

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import CenteredLoader from "../../components/CenteredLoader";

const CommunitiesListCard = () => {
  const GET_COMMUNITIES = gql`
    query($host: String!) {
      getCommunities(host: $host) {
        id
        title
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_COMMUNITIES, {
    variables: {
      host: "this",
    },
  });

  if (error) return <div />;
  if (loading) return <CenteredLoader />;
  console.log(data.getCommunities);

  return (
    <Grid item>
      <Card>
        <CardHeader subheader="Communities" />
        <Divider />
        <CardContent style={{ padding: "0px" }}>
          <List>
            {data.getCommunities.map((community: any) => {
              return (
                <ListItem
                  button
                  key={community.id}
                  onClick={() => {
                    location.href = "/instances/this/communities/" + community.id + "/posts";
                  }}
                >
                  <ListItemText primary={community.title} />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CommunitiesListCard;
