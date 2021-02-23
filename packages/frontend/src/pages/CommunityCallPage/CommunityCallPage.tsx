/*
 * CS3099 Group A3
 */

import { ReactElement, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Theme, makeStyles } from "@material-ui/core";
import { gql, useSubscription, useMutation } from "@apollo/client";
import { VideoWrapperProps } from "./VideoWrapper";
import VideoGrid from "./VideoGrid";
import JoinCallMessage from "./JoinCallMessage";

interface CommunityCall {
  type: "request" | "offer" | "answer" | "ice";
  from: string;
  sdp: string;
}

interface PeerReference {
  connection: RTCPeerConnection;
  channel: RTCDataChannel;
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

const VideoCall = (): ReactElement => {
  const classes = useStyles();

  const [localMediaStream, setLocalMediaStream] = useState<MediaStream | null>();
  const [localMuted, setLocalMuted] = useState(false);

  const inCall = localMediaStream !== undefined;

  const peerReferences = useRef<{ [user: string]: PeerReference | undefined }>({});
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);

  const { community } = useParams<{ community: string }>();

  const [sendEvent] = useMutation(gql`
    mutation($community: String!, $user: String, $sdp: String, $type: String!) {
      communityCallEvent(type: $type, community: $community, user: $user, sdp: $sdp)
    }
  `);

  const addConnectedUser = (username: string, stream: MediaStream) =>
    setConnectedUsers((current) => [
      ...current,
      {
        stream,
        username,
        muted: false,
      },
    ]);

  const mutateConnectedUser = <K extends keyof ConnectedUser>(
    username: string,
    key: K,
    value: ConnectedUser[K],
  ) =>
    setConnectedUsers((current) =>
      current.map((user) => {
        if (user.username === username) {
          user[key] = value;
        }

        return user;
      }),
    );

  const removeConnectedUser = (username: string) =>
    setConnectedUsers((current) => current.filter((user) => user.username !== username));

  const closePeerConnection = (username: string) => {
    const peerReference = peerReferences.current[username];

    if (peerReference) {
      peerReference.channel.onclose = null;
      peerReference.connection.oniceconnectionstatechange = null;
      peerReference.connection.onicecandidate = null;
      peerReference.connection.ontrack = null;

      peerReference.channel.close();
      peerReference.connection.close();
      delete peerReferences.current[username];
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

  const createPeerConnection = async (username: string, community: string) => {
    endUserConnection(username);

    const peerConnection = new RTCPeerConnection(peerConnectionOptions);

    const dataChannel = peerConnection.createDataChannel("disconnection", {
      negotiated: true,
      id: 0,
    });

    peerReferences.current[username] = {
      connection: peerConnection,
      channel: dataChannel,
    };

    dataChannel.onclose = () => endUserConnection(username);

    localMediaStream
      ?.getTracks()
      .forEach((track) => peerConnection.addTrack(track, localMediaStream));

    let remoteStream: MediaStream;
    peerConnection.ontrack = ({ streams: [stream] }) => {
      remoteStream = stream;
    };

    peerConnection.onicecandidate = ({ candidate }) => {
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

    peerConnection.oniceconnectionstatechange = () => {
      switch (peerConnection.iceConnectionState) {
        case "connected":
          addConnectedUser(username, remoteStream);
          break;
        case "closed":
        case "failed":
        case "disconnected":
          endUserConnection(username);
          break;
      }
    };

    return peerConnection;
  };

  const onRequest = async ({ from: username }: CommunityCall): Promise<void> => {
    const peerConnection = await createPeerConnection(username, community);

    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });

    await peerConnection.setLocalDescription(offer);

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

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

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
    const peerReference = peerReferences.current[username];

    if (peerReference) {
      await peerReference.connection.setRemoteDescription(JSON.parse(sdp));
    }
  };

  const onIce = async ({ from: username, sdp }: CommunityCall): Promise<void> => {
    const peerReference = peerReferences.current[username];

    if (peerReference) {
      await peerReference.connection.addIceCandidate(new RTCIceCandidate(JSON.parse(sdp)));
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
        Object.keys(peerReferences.current).forEach(closePeerConnection);
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
      onMuteChange: () => mutateConnectedUser(username, "muted", !muted),
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
};

export default VideoCall;
