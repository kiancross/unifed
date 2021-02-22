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

  const peerReferences = useRef<{ [user: string]: PeerReference | undefined }>({});
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);

  const { community } = useParams<{ community: string }>();

  const { data: subscription }: { data?: { communityCalls: CommunityCall } } = useSubscription(
    gql`
      subscription($community: String!) {
        communityCalls(community: $community) {
          from
          type
          sdp
        }
      }
    `,
    { variables: { community } },
  );

  const [sendEvent] = useMutation(gql`
    mutation($community: String!, $user: String, $sdp: String, $type: String!) {
      communityCallEvent(type: $type, community: $community, user: $user, sdp: $sdp)
    }
  `);

  const addConnectedUser = (username: string) => {
    const wrapper = {
      username,
      muted: false,
    };

    setConnectedUsers((current) => [...current, wrapper]);
  };

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
      peerReference.channel.close();

      if (peerReference.connection.connectionState === "connected") {
        peerReference.connection.close();
      }

      delete peerReferences.current[username];
    }
  };

  const endUserConnection = (username: string) => {
    closePeerConnection(username);
    removeConnectedUser(username);
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

    peerConnection.ontrack = ({ streams: [stream] }) => {
      addConnectedUser(username);
      mutateConnectedUser(username, "stream", stream);
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
        case "closed":
        case "failed":
        case "disconnected":
          endUserConnection(username);
          break;
      }
    };

    return peerConnection;
  };

  const muteLocal = (muted: boolean) => {
    setLocalMuted(muted);
    localMediaStream?.getTracks().forEach((track) => {
      if (track.kind === "audio") {
        track.enabled = !muted;
      }
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

  const onRequest = async ({ from: user }: CommunityCall): Promise<void> => {
    const peerConnection = await createPeerConnection(user, community);

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
        user,
      },
    });
  };

  const onOffer = async ({ from: user, sdp }: CommunityCall): Promise<void> => {
    const peerConnection = await createPeerConnection(user, community);

    await peerConnection.setRemoteDescription(JSON.parse(sdp));

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    await sendEvent({
      variables: {
        type: "answer",
        community,
        sdp: JSON.stringify(answer),
        user,
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

  useEffect(() => {
    if (localMediaStream === undefined) {
      return () => null;
    } else {
      sendEvent({ variables: { type: "request", community } });
      return () => {
        sendEvent({ variables: { type: "disconnect", community } });
        localMediaStream?.getTracks().forEach((track) => track.stop());
      };
    }
  }, [localMediaStream]);

  useEffect(() => {
    if (subscription && localMediaStream !== undefined) {
      switch (subscription.communityCalls.type) {
        case "request":
          onRequest(subscription.communityCalls);
          break;

        case "offer":
          onOffer(subscription.communityCalls);
          break;

        case "answer":
          onAnswer(subscription.communityCalls);
          break;

        case "ice":
          onIce(subscription.communityCalls);
          break;
      }
    }
  }, [subscription]);

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
