/*
 * CS3099 Group A3
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
