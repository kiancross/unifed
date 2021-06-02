/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
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

import { useEffect, useState, useRef, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Container, Theme, makeStyles } from "@material-ui/core";
import { gql, useSubscription, useMutation } from "@apollo/client";

import { SafePeerConnection } from "./safe-peer-connection";
import { VideoWrapperProps } from "./VideoWrapper";
import { VideoGrid } from "./VideoGrid";
import { JoinCallMessage } from "./JoinCallMessage";

/**
 * URL parameters for [[`CommunityCallPage`]].
 *
 * @internal
 */
export interface CommunityCallPageParams {
  community: string;
}

interface CommunityCall {
  type: "request" | "offer" | "answer" | "ice";
  from: string;
  sdp: string;
}

interface ConnectedUser {
  username: string;
  muted: boolean;
  stream?: MediaStream;
}

const peerConnectionOptions = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100%",
    paddingTop: theme.spacing(3),
  },
}));

/**
 *  Allows users to join a group call with other
 *  community members.
 *
 *  Outline:
 *
 *   - Users are displayed a 'Join' button.
 *
 *   - Users are placed into a group call with other
 *     members after clicking the 'Join' button.
 *
 *   - Users can mute themselves and other members
 *     in the call - useful for 1-on-1 or
 *     restricted group conversations.
 *
 *   - Access to the user's microphone and camera
 *     is required.
 *
 *  @internal
 */
export function CommunityCallPage(): ReactElement {
  const classes = useStyles();

  const [localMediaStream, setLocalMediaStream] = useState<MediaStream | null>();
  const [localMuted, setLocalMuted] = useState(false);

  const inCall = localMediaStream !== undefined;

  const peerConnections = useRef<{ [user: string]: SafePeerConnection }>({});
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);

  const { community } = useParams<CommunityCallPageParams>();

  const [sendEvent] = useMutation(gql`
    mutation($community: String!, $user: String, $sdp: String, $type: String!) {
      communityCallEvent(type: $type, community: $community, user: $user, sdp: $sdp)
    }
  `);

  const addConnectedUser = (username: string, stream?: MediaStream) =>
    setConnectedUsers((current) => [
      ...current,
      {
        stream,
        username,
        muted: false,
      },
    ]);

  const muteConnectedUser = (username: string, muted: boolean) =>
    setConnectedUsers((current) =>
      current.map((user) => {
        if (user.username === username) {
          user.muted = muted;
        }

        return user;
      }),
    );

  const removeConnectedUser = (username: string) =>
    setConnectedUsers((current) => current.filter((user) => user.username !== username));

  const closePeerConnection = (username: string) => {
    const peerConnection = peerConnections.current[username];

    if (peerConnection) {
      peerConnection.onready = null;
      peerConnection.onclose = null;

      peerConnection.close();

      delete peerConnections.current[username];
    }
  };

  const endUserConnection = (username: string) => {
    closePeerConnection(username);
    removeConnectedUser(username);
  };

  const muteLocal = (muted: boolean) => {
    setLocalMuted(muted);
    localMediaStream?.getAudioTracks().forEach((track) => {
      track.enabled = !muted;
    });
  };

  const getLocalMediaStream = async () => {
    try {
      setLocalMediaStream(
        await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        }),
      );
    } catch (error) {
      if (error instanceof DOMException) {
        setLocalMediaStream(null);
      } else {
        throw error;
      }
    }
  };

  const createPeerConnection = async (
    username: string,
    community: string,
  ): Promise<SafePeerConnection> => {
    endUserConnection(username);

    const peerConnection = new SafePeerConnection(peerConnectionOptions, localMediaStream);

    peerConnections.current[username] = peerConnection;

    peerConnection.onclose = () => endUserConnection(username);
    peerConnection.onready = (stream) => addConnectedUser(username, stream);

    peerConnection.super.onicecandidate = ({ candidate }) => {
      if (candidate) {
        sendEvent({
          variables: {
            type: "ice",
            community,
            sdp: JSON.stringify(candidate),
            username,
          },
        });
      }
    };

    return peerConnection;
  };

  const onRequest = async ({ from: username }: CommunityCall): Promise<void> => {
    const peerConnection = await createPeerConnection(username, community);

    const offer = await peerConnection.super.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });

    await peerConnection.super.setLocalDescription(offer);

    await sendEvent({
      variables: {
        type: "offer",
        community,
        sdp: JSON.stringify(offer),
        user: username,
      },
    });
  };

  const onOffer = async ({ from: username, sdp }: CommunityCall): Promise<void> => {
    const peerConnection = await createPeerConnection(username, community);

    await peerConnection.setRemoteDescription(JSON.parse(sdp));

    const answer = await peerConnection.super.createAnswer();
    await peerConnection.super.setLocalDescription(answer);

    await sendEvent({
      variables: {
        type: "answer",
        community,
        sdp: JSON.stringify(answer),
        user: username,
      },
    });
  };

  const onAnswer = async ({ from: username, sdp }: CommunityCall): Promise<void> => {
    const peerConnection = peerConnections.current[username];

    if (peerConnection) {
      await peerConnection.setRemoteDescription(JSON.parse(sdp));
    }
  };

  const onIce = async ({ from: username, sdp }: CommunityCall): Promise<void> => {
    const peerConnection = peerConnections.current[username];

    if (peerConnection) {
      const candidate = new RTCIceCandidate(JSON.parse(sdp));
      peerConnection.addIceCandidate(candidate);
    }
  };

  const onSubscription = (communityCall: CommunityCall) => {
    if (inCall) {
      switch (communityCall.type) {
        case "request":
          onRequest(communityCall);
          break;

        case "offer":
          onOffer(communityCall);
          break;

        case "answer":
          onAnswer(communityCall);
          break;

        case "ice":
          onIce(communityCall);
          break;
      }
    }
  };

  useEffect(() => {
    if (localMediaStream === undefined) {
      connectedUsers.map(({ username }) => username).forEach(removeConnectedUser);
      return () => null;
    } else {
      sendEvent({ variables: { type: "request", community } });

      return () => {
        // Do not need to worry about this warning, as we are not referencing
        // a DOM element.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Object.keys(peerConnections.current).forEach(closePeerConnection);
        localMediaStream?.getTracks().forEach((track) => track.stop());
      };
    }
    // We are intentionally not re-rendering when connectedUsers
    // changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localMediaStream, community, sendEvent]);

  useSubscription(
    gql`
      subscription($community: String!) {
        communityCalls(community: $community) {
          from
          type
          sdp
        }
      }
    `,
    {
      variables: { community },
      onSubscriptionData: ({ subscriptionData }) => {
        if (subscriptionData.data) {
          onSubscription(subscriptionData.data.communityCalls);
        }
      },
    },
  );

  const users: VideoWrapperProps[] = connectedUsers
    .filter((user) => user.stream)
    .map(({ username, stream, muted }) => ({
      username,
      stream,
      muted,
      onMuteChange: () => muteConnectedUser(username, !muted),
    }));

  if (localMediaStream) {
    users.unshift({
      username: "You",
      stream: localMediaStream,
      muted: localMuted,
      self: true,
      onMuteChange: () => muteLocal(!localMuted),
      onLeaveCall: () => setLocalMediaStream(undefined),
    });
  }

  return (
    <Container maxWidth={false} className={classes.container}>
      {localMediaStream === undefined ? (
        <JoinCallMessage onJoinClick={() => getLocalMediaStream()} />
      ) : (
        <VideoGrid users={users} />
      )}
    </Container>
  );
}
