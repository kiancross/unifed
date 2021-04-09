/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

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

import { LoadingCard } from "../../components";

/**
 * GraphQL query to get the communities on a certain host.
 */
export const getCommunitiesQuery = gql`
  query($host: String!) {
    getCommunities(host: $host) {
      id
      title
    }
  }
`;

export function CommunitiesListCard(): ReactElement {
  const { loading, error, data } = useQuery(getCommunitiesQuery, {
    variables: {
      host: "this",
    },
  });

  if (error) return <React.Fragment />;
  if (loading) return <LoadingCard />;

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
                  component={Link}
                  to={"/instances/this/communities/" + community.id + "/posts"}
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
}
