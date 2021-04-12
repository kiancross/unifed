/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";

/**
 * Properties for the [[`SubscribeButton`]] component.
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
   * True if the user is subscribe to the community, false otherwise.
   */
  isSubscribed: boolean;
}

/**
 * GraphQL query to subscribe to a community.
 */
export const subscribeQuery = gql`
  mutation($id: String!, $host: String!) {
    subscribe(community: { id: $id, host: $host })
  }
`;

/**
 * GraphQL query to unsubscribe from a community.
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
 *  - The button is reads 'subscribe' if the user is not subscribed.
 *
 *  - The button is reads 'unsubscribe' if the user is subscribed.
 *
 * @param props Properties passed to the component. See [[`SubscribeButtonProps`]].
 * @internal
 */
export function SubscribeButton(props: SubscribeButtonProps): ReactElement {
  const [subscribed, setSubscribed] = React.useState(props.isSubscribed);
  const [mutation, { loading, error, data }] = useMutation(
    subscribed ? unsubscribeQuery : subscribeQuery,
  );

  if (loading) {
    return (
      <Button disabled variant="contained" color="primary">
        {subscribed ? "Subscribe" : "Unsubscribe"}
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
    >
      {subscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
}
