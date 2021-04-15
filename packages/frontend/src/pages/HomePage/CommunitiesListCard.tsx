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
 * GraphQL query to get communities on a certain host.
 *
 * @internal
 */
export const getCommunitiesQuery = gql`
  query($host: String!) {
    getCommunities(host: $host) {
      id
      title
    }
  }
`;

/**
 * Displays a list of communities on the user's host.
 *
 * Outline:
 *
 *  - This is displayed on the [[`HomePage`]] of the application, giving users a
 *    list of communities to visit.
 *
 * @internal
 */
export function CommunitiesListCard(): ReactElement {
  const { loading, error, data } = useQuery(getCommunitiesQuery, {
    variables: {
      host: "this",
    },
  });

  if (error) return <React.Fragment />;
  if (loading) return <LoadingCard />;

  const internalRef = process.env.REACT_APP_INTERNAL_REFERENCE;

  return (
    <Grid item>
      <Card>
        <CardHeader subheader="Communities" />
        <Divider />
        <CardContent style={{ padding: "0px" }}>
          <List aria-label="communities">
            {data.getCommunities.map((community: any) => {
              return (
                <ListItem
                  button
                  key={community.id}
                  component={Link}
                  to={"/instances/" + internalRef + "/communities/" + community.id + "/posts"}
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
