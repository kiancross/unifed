/*
 * CS3099 Group A3
 */

import { waitFor } from "@testing-library/react";
import { SafePeerConnection } from "../safe-peer-connection";

class MockMediaStream {
  constructor(private tracks: unknown[]) {}

  getTracks() {
    return this.tracks;
  }

  getVideoTracks() {
    return undefined;
  }
}

class MockDataChannel {}

class MockPeerConnection {
  iceConnectionState = "checking";

  onIceConnectionStateChange = () => void 0;
  onTrack: (_: { streams: MockMediaStream[] }) => void;

  set oniceconnectionstatechange(callback: () => void) {
    this.onIceConnectionStateChange = callback;
  }

  set ontrack(callback: (_: { streams: MockMediaStream[] }) => unknown[]) {
    this.onTrack = callback;
  }

  addTrack() {
    return;
  }

  createDataChannel() {
    return new MockDataChannel();
  }
}

type MutatedSafePeerConnection<T> = Omit<SafePeerConnection, "super"> & { super: T };

const getPeerConnection = <T extends MockPeerConnection>(
  base: T,
  stream?: MockMediaStream,
): MutatedSafePeerConnection<T> =>
  (new SafePeerConnection(
    null,
    stream as any, // eslint-disable-line
    base as any, // eslint-disable-line
  ) as unknown) as MutatedSafePeerConnection<T>;

test("constructor without stream", async () => {
  const createDataChannelMock = jest.fn();

  class SpyPeerConnection extends MockPeerConnection {
    createDataChannel() {
      createDataChannelMock();

      return super.createDataChannel();
    }
  }

  getPeerConnection(SpyPeerConnection);

  expect(createDataChannelMock).toHaveBeenCalledTimes(1);
});

test("constructor with stream", async () => {
  const addTrackMock = jest.fn();

  class SpyPeerConnection extends MockPeerConnection {
    addTrack() {
      addTrackMock();
    }
  }

  getPeerConnection(SpyPeerConnection, new MockMediaStream([1, 2, 3]));

  expect(addTrackMock).toHaveBeenCalledTimes(3);
});

test("addIceCandidate whilst disconnected", async () => {
  const addIceCandidateMock = jest.fn();

  class SpyPeerConnection extends MockPeerConnection {
    public remoteDescription = {};

    addIceCandidate() {
      addIceCandidateMock();
    }

    setRemoteDescription() {
      return;
    }
  }

  const pc = getPeerConnection(SpyPeerConnection);

  await pc.addIceCandidate(null);
  await pc.addIceCandidate(null);
  await pc.addIceCandidate(null);

  expect(addIceCandidateMock).toHaveBeenCalledTimes(0);

  await pc.setRemoteDescription(null);

  expect(addIceCandidateMock).toHaveBeenCalledTimes(3);
});

test("addIceCandidate whilst connected", async () => {
  const addIceCandidateMock = jest.fn();

  class SpyPeerConnection extends MockPeerConnection {
    public remoteDescription = { type: true };

    addIceCandidate() {
      addIceCandidateMock();
    }
  }

  const pc = getPeerConnection(SpyPeerConnection);

  await pc.addIceCandidate(null);
  await pc.addIceCandidate(null);
  await pc.addIceCandidate(null);

  expect(addIceCandidateMock).toHaveBeenCalledTimes(3);
});

test("onready without stream", async () => {
  const onReadyMock = jest.fn();

  const pc = getPeerConnection(MockPeerConnection);
  pc.onready = onReadyMock;

  pc.super.iceConnectionState = "connected";
  pc.super.onIceConnectionStateChange();

  await waitFor(() => {
    expect(onReadyMock).toHaveBeenCalledTimes(1);
    expect(onReadyMock).toHaveBeenCalledWith(undefined);
  });
});

test("onready with stream", async () => {
  const onReadyMock = jest.fn();

  class SpyPeerConnection extends MockPeerConnection {}

  const pc = getPeerConnection(SpyPeerConnection, new MockMediaStream([1]));
  pc.onready = onReadyMock;

  const stream = new MockMediaStream([1]);

  pc.super.onTrack({ streams: [stream] });
  pc.super.iceConnectionState = "connected";
  pc.super.onIceConnectionStateChange();

  await waitFor(() => {
    expect(onReadyMock).toHaveBeenCalledTimes(1);
    expect(onReadyMock).toHaveBeenCalledWith(stream);
  });
});

test("close", async () => {
  const dataChannelCloseMock = jest.fn();
  const pcCloseMock = jest.fn();

  class SpyMockDataChannel extends MockDataChannel {
    close() {
      dataChannelCloseMock();
    }
  }

  class SpyPeerConnection extends MockPeerConnection {
    createDataChannel() {
      return new SpyMockDataChannel();
    }

    close() {
      pcCloseMock();
    }
  }

  const pc = getPeerConnection(SpyPeerConnection);

  expect(dataChannelCloseMock).toHaveBeenCalledTimes(0);
  expect(pcCloseMock).toHaveBeenCalledTimes(0);

  pc.close();

  expect(dataChannelCloseMock).toHaveBeenCalledTimes(1);
  expect(pcCloseMock).toHaveBeenCalledTimes(1);
});

test("onclose disconnection channel", async () => {
  const onCloseMock = jest.fn();

  class SpyMockDataChannel extends MockDataChannel {
    onClose: () => void;

    set onclose(callback: () => void) {
      this.onClose = callback;
    }
  }

  const dataChannel = new SpyMockDataChannel();

  class SpyPeerConnection extends MockPeerConnection {
    createDataChannel() {
      return dataChannel;
    }
  }

  const pc = getPeerConnection(SpyPeerConnection, new MockMediaStream([1]));
  pc.onclose = onCloseMock;

  dataChannel.onClose();

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

test("onclose ice status", async () => {
  const onCloseMock = jest.fn();

  const pc = getPeerConnection(MockPeerConnection, new MockMediaStream([1]));
  pc.onclose = onCloseMock;

  pc.super.iceConnectionState = "disconnected";
  pc.super.onIceConnectionStateChange();

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});
