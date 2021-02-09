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

const SubscribeButton = (props: Props): JSX.Element => {
  const [subscribe, { loading, error, data }] = useMutation(SUBSCRIBE);
  let isSubscribed = props.isSubscribed;

  if (loading) {
    return (
      <Button disabled variant="contained" color="primary">
        {isSubscribed ? "Subscribe" : "Subscribed"}
      </Button>
    );
  }
  if (error) return <div />;
  if (data) isSubscribed = data?.subscribe || !data?.unsubscribe;

  return (
    <Button
      onClick={() => {
        if (isSubscribed) subscribe({ variables: { id: props.id, host: props.server } });
        else subscribe({ variables: { id: props.id, host: props.server } }); // update to unsubscribe call
      }}
      variant="contained"
      color={isSubscribed ? "secondary" : "primary"}
      disableElevation
    >
      {isSubscribed ? "Subscribed" : "Subscribe"}
    </Button>
  );
};

export default SubscribeButton;
