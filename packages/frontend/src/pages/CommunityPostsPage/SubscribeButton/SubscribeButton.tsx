/*
 * Copyright (C) 2021 Allan Mathew Chacko
 * Copyright (C) 2021 Robert Mardall
 * Copyright (C) 2021 Kian Cross
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
import { gql, useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";

/**
 * Properties for the [[`SubscribeButton`]] component.
 *
 * @internal
 */
export interface SubscribeButtonProps {
  /**
   * ID of the community to subscribe/unsubscribe to/from.
   */
  id: string;

  /**
   * Host the chosen community is located on.
   */
  host: string;

  /**
   * Indicates whether the user is subscribed to the community.
   */
  isSubscribed: boolean;
}

/**
 * GraphQL query to subscribe to a community.
 *
 * @internal
 */
export const subscribeQuery = gql`
  mutation($id: String!, $host: String!) {
    subscribe(community: { id: $id, host: $host })
  }
`;

/**
 * GraphQL query to unsubscribe from a community.
 *
 * @internal
 */
export const unsubscribeQuery = gql`
  mutation($id: String!, $host: String!) {
    unsubscribe(community: { id: $id, host: $host })
  }
`;

/**
 * Allows users to subscribe to communities.
 *
 * Outline:
 *
 *  - The button reads 'Subscribe' if the user is not subscribed.
 *
 *  - The button reads 'Unsubscribe' if the user is subscribed.
 *
 * @param props Properties passed to the component. See [[`SubscribeButtonProps`]].
 *
 * @internal
 */
export function SubscribeButton(props: SubscribeButtonProps): ReactElement {
  const [subscribed, setSubscribed] = React.useState(props.isSubscribed);
  const [mutation, { loading, error, data }] = useMutation(
    subscribed ? unsubscribeQuery : subscribeQuery,
  );

  if (loading) {
    return (
      <Button
        disabled
        variant="contained"
        color="primary"
        aria-label={subscribed ? "subscribe" : "unsubscribe"}
      >
        {subscribed ? "subscribe" : "unsubscribe"}
      </Button>
    );
  }
  if (error) return <div />;
  // update subscribed to reflect the new state after a mutation was made
  if (data && (data?.subscribe || !data?.unsubscribe) != subscribed)
    setSubscribed(data?.subscribe || !data?.unsubscribe);

  return (
    <Button
      onClick={() => {
        mutation({ variables: { id: props.id, host: props.host } });
      }}
      variant="contained"
      color={subscribed ? "secondary" : "primary"}
      disableElevation
      aria-label={subscribed ? "unsubscribe" : "subscribe"}
    >
      {subscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
}
