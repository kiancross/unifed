/*
 * CS3099 Group A3
 */

import { ReactElement, useEffect, useState } from "react";
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

interface PeerWrapper {
  user: string;
  stream?: MediaStream;
  connection: RTCPeerConnection;
  muted: boolean;
  hidden: boolean;
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
  const [peerConnectionWrappers, setPeerConnectionsWrappers] = useState<PeerWrapper[]>([]);

  const { community } = useParams<{ community: string }>();

  const { data: subscription } = useSubscription(
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

  const addPeerConnection = (user: string, connection: RTCPeerConnection) => {
    const wrapper = {
      user,
      connection,
      hidden: false,
      muted: false,
    };

    setPeerConnectionsWrappers((current) => [...current, wrapper]);
  };

  const mutatePeerConnection = <K extends keyof PeerWrapper>(
    user: string,
    key: K,
    value: PeerWrapper[K],
  ) =>
    setPeerConnectionsWrappers((current) =>
      current.map((wrapper) => {
        if (wrapper.user === user) {
          wrapper[key] = value;
        }
        return wrapper;
      }),
    );

  const findPeerConnection = (user: string): RTCPeerConnection => {
    const wrapper = peerConnectionWrappers.find((wrapper) => wrapper.user === user);
    if (!wrapper) {
      throw new Error("peerConnection not found");
    }

    return wrapper.connection;
  };

  const removePeerConnection = (user: string) =>
    setPeerConnectionsWrappers((current) =>
      current.filter((wrapper) => {
        if (wrapper.user === user) {
          if (wrapper.connection.connectionState === "connected") {
            wrapper.connection.close();
          }
          return false;
        }
        return true;
      }),
    );

  const createPeerConnection = async (user: string, community: string) => {
    removePeerConnection(user);

    const peerConnection = new RTCPeerConnection(peerConnectionOptions);

    addPeerConnection(user, peerConnection);

    localMediaStream
      ?.getTracks()
      .forEach((track) => peerConnection.addTrack(track, localMediaStream));

    peerConnection.ontrack = ({ streams: [stream] }) => {
      mutatePeerConnection(user, "stream", stream);
    };

    peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        sendEvent({
          variables: {
            type: "ice",
            community,
            sdp: JSON.stringify(candidate),
            user,
          },
        });
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      switch (peerConnection.iceConnectionState) {
        case "closed":
        case "failed":
        case "disconnected":
          removePeerConnection(user);
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

  const onAnswer = async ({ from: user, sdp }: CommunityCall): Promise<void> => {
    const peerConnection = findPeerConnection(user);

    await peerConnection.setRemoteDescription(JSON.parse(sdp));
  };

  const onIce = async ({ from: user, sdp }: CommunityCall): Promise<void> => {
    const peerConnection = findPeerConnection(user);

    await peerConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(sdp)));
  };

  const onRemoteDisconnect = ({ from: user }: CommunityCall) => {
    removePeerConnection(user);
  };

  useEffect(() => {
    if (localMediaStream === undefined) {
      peerConnectionWrappers.map((wrapper) => wrapper.user).forEach(removePeerConnection);
    } else {
      sendEvent({ variables: { type: "request", community } });
    }

    return () => {
      sendEvent({ variables: { type: "disconnect", community } });
      localMediaStream?.getTracks().forEach((track) => track.stop());
    };
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

        case "disconnect":
          onRemoteDisconnect(subscription.communityCalls);
          break;
      }
    }
  }, [subscription]);

  const users: VideoWrapperProps[] = peerConnectionWrappers
    .filter((wrapper) => wrapper.stream)
    .map(({ user, stream, muted }) => ({
      username: user,
      stream,
      muted,
      onMuteChange: () => mutatePeerConnection(user, "muted", !muted),
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
