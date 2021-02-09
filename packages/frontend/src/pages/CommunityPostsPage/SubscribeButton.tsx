/*
 * CS3099 Group A3
 */

import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";

interface Props {
  id: string;
  server: string;
  isSubscribed: boolean;
}

const SUBSCRIBE = gql`
  mutation($id: String!, $host: String!) {
    subscribe(community: { id: $id, host: $host })
  }
`;

const UNSUBSCRIBE = gql`
  mutation($id: String!, $host: String!) {
    unsubscribe(community: { id: $id, host: $host })
  }
`;

const SubscribeButton = (props: Props): JSX.Element => {
  const [subscribed, setSubscribed] = React.useState(props.isSubscribed);
  const [mutation, { loading, error, data }] = useMutation(subscribed ? UNSUBSCRIBE : SUBSCRIBE);

  if (loading) {
    return (
      <Button disabled variant="contained" color="primary">
        {subscribed ? "Subscribe" : "Subscribed"}
      </Button>
    );
  }
  if (error) return <div />;
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
      {subscribed ? "Subscribed" : "Subscribe"}
    </Button>
  );
};

export default SubscribeButton;
