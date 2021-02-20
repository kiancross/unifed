/*
 * CS3099 Group A3
 */

import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Theme, makeStyles } from "@material-ui/core";
import { gql, useSubscription, useMutation } from "@apollo/client";
import VideoGrid, { UserProps } from "./VideoGrid";
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

  const [requestCall] = useMutation(gql`
    mutation($community: String!) {
      requestCommunityCall(community: $community)
    }
  `);

  const [respondCall] = useMutation(gql`
    mutation($community: String!, $user: String!, $sdp: String!, $type: String!) {
      respondCommunityCall(type: $type, community: $community, user: $user, sdp: $sdp)
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
  ) => {
    setPeerConnectionsWrappers((current) =>
      current.map((wrapper) => {
        if (wrapper.user === user) {
          wrapper[key] = value;
        }
        return wrapper;
      }),
    );
  };

  const findPeerConnection = (user: string): RTCPeerConnection => {
    const wrapper = peerConnectionWrappers.find((wrapper) => wrapper.user === user);
    if (!wrapper) {
      throw new Error("peerConnection not found");
    }

    return wrapper.connection;
  };

  const removePeerConnection = (user: string) => {
    setPeerConnectionsWrappers((current) =>
      current.filter((wrapper) => {
        if (wrapper.user === user) {
          if (wrapper.connection.connectionState === "connected") {
            wrapper.connection.close();
          }
        }
      }),
    );
  };

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
        respondCall({
          variables: {
            type: "ice",
            community,
            sdp: JSON.stringify(candidate),
            user,
          },
        });
      }
    };

    peerConnection.onconnectionstatechange = () => {
      switch (peerConnection.connectionState) {
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

  const onRequest = async (communityCall: CommunityCall): Promise<void> => {
    const user = communityCall.from;

    const peerConnection = await createPeerConnection(user, community);

    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });

    await peerConnection.setLocalDescription(offer);

    await respondCall({
      variables: {
        type: "offer",
        community,
        sdp: JSON.stringify(offer),
        user,
      },
    });
  };

  const onOffer = async (communityCall: CommunityCall): Promise<void> => {
    const user = communityCall.from;

    const peerConnection = await createPeerConnection(user, community);

    await peerConnection.setRemoteDescription(JSON.parse(communityCall.sdp));

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    await respondCall({
      variables: {
        type: "answer",
        community,
        sdp: JSON.stringify(answer),
        user,
      },
    });
  };

  const onAnswer = async (communityCall: CommunityCall): Promise<void> => {
    const user = communityCall.from;

    const peerConnection = findPeerConnection(user);

    await peerConnection.setRemoteDescription(JSON.parse(communityCall.sdp));
  };

  const onIce = async (communityCall: CommunityCall): Promise<void> => {
    const user = communityCall.from;

    const peerConnection = findPeerConnection(user);

    await peerConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(communityCall.sdp)));
  };

  useEffect(() => {
    if (localMediaStream !== undefined) {
      requestCall({ variables: { community } });
    }

    return () => {
      peerConnectionWrappers.map((wrapper) => wrapper.user).forEach(removePeerConnection);
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
      }
    }
  }, [subscription]);

  const users: UserProps[] = peerConnectionWrappers
    .filter((wrapper) => wrapper.stream)
    .map(({ user, stream, muted }) => ({
      username: user,
      stream,
      muted,
    }));

  if (localMediaStream) {
    users.unshift({
      username: "You",
      stream: localMediaStream,
      muted: localMuted,
      self: true,
    });
  }

  return (
    <Container maxWidth={false} className={classes.container}>
      {localMediaStream === undefined ? (
        <JoinCallMessage onJoinClick={() => getLocalMediaStream()} />
      ) : (
        <VideoGrid
          users={users}
          onMuteChange={({ username, self, muted }) => {
            if (self) {
              muteLocal(!muted);
            } else {
              mutatePeerConnection(username, "muted", !muted);
            }
          }}
        />
      )}
    </Container>
  );
};

export default VideoCall;
