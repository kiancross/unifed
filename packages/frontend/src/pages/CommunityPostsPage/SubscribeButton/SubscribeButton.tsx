/*
 * CS3099 Group A3
 */

import React, { ReactElement } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";

interface Props {
  id: string;
  server: string;
  isSubscribed: boolean;
}

export const SUBSCRIBE = gql`
  mutation($id: String!, $host: String!) {
    subscribe(community: { id: $id, host: $host })
  }
`;

export const UNSUBSCRIBE = gql`
  mutation($id: String!, $host: String!) {
    unsubscribe(community: { id: $id, host: $host })
  }
`;

export const SubscribeButton = (props: Props): ReactElement => {
  const [subscribed, setSubscribed] = React.useState(props.isSubscribed);
  const [mutation, { loading, error, data }] = useMutation(subscribed ? UNSUBSCRIBE : SUBSCRIBE);

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
        mutation({ variables: { id: props.id, host: props.server } });
      }}
      variant="contained"
      color={subscribed ? "secondary" : "primary"}
      disableElevation
    >
      {subscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
};
