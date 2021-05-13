/*
 * Copyright (C) 2021 Allan Mathew Chacko
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
 * Copyright (C) 2021 Lewis Mazzei
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
