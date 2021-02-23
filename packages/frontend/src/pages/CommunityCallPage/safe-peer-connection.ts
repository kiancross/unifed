/*
 * CS3099 Group A3
 */

/*
 * There are some bugs with the implementation of RTCPeerConnection on
 * some browsers. This wrapper attempts to abstract over these issues
 * so that it can be used transparently within other code (without
 * having to worry about the edge cases).
 *
 * In addition to the above, this wrapper adds some convenience
 * events, such as `onclose` and `onready`. These merge multiple
 * internal events into a single one.
 *
 * Finally, a data channel is added to handle disconnections
 * gracefully.
 */

type ReadyCallback = ((remoteStream: MediaStream | undefined) => void) | undefined | null;
type CloseCallback = (() => void) | undefined | null;

export class SafePeerConnection extends RTCPeerConnection {
  private iceCandidates: RTCIceCandidate[] = [];
  private disconnectionChannel: RTCDataChannel;

  private remoteStream: MediaStream | undefined;

  private onReadyCallback: ReadyCallback;
  private onCloseCallback: CloseCallback;

  constructor(configuration?: RTCConfiguration, localStream?: MediaStream | null) {
    super(configuration);

    localStream?.getTracks().forEach((track) => this.addTrack(track, localStream));

    // Create a data channel for signalling disconnections.
    this.disconnectionChannel = super.createDataChannel("disconnection", {
      negotiated: true,
      id: 0,
    });

    this.setIceConnectionStatusCallback();
    this.setOnDisconnectionCloseCallback();
    this.setOnTrackAddCallback();
  }

  set onready(callback: ReadyCallback | undefined | null) {
    this.onReadyCallback = callback;
  }

  set onclose(callback: CloseCallback | undefined | null) {
    this.onCloseCallback = callback;
  }

  private isRemoteStreamReady(): boolean {
    const videoTracks = this.remoteStream?.getVideoTracks();
    const connected = this.iceConnectionState === "connected";

    // If the frame rate is greater than 0 then the video is ready.
    const videoReady = videoTracks && videoTracks[0].getSettings().frameRate;

    return !!(connected && (videoTracks === undefined || videoReady));
  }

  private setIceConnectionStatusCallback() {
    this.oniceconnectionstatechange = () => {
      let intervalReference: NodeJS.Timeout | undefined = undefined;

      switch (this.iceConnectionState) {
        case "connected": {
          /*
           * Waits until the remove video connection is ready
           * before calling the onReady callback. This ensures
           * the subscriber does not get called before the
           * video stream is actually visible.
           */
          intervalReference = setInterval(() => {
            if (this.isRemoteStreamReady() && intervalReference) {
              clearInterval(intervalReference);
              intervalReference = undefined;

              this.onReadyCallback && this.onReadyCallback(this.remoteStream);
            }
          }, 100);
          break;
        }
        case "closed":
        case "failed":
        case "disconnected":
          intervalReference && clearInterval(intervalReference);

          this.onCloseCallback && this.onCloseCallback();

          /*
           * Once we have called the onClose callback, set it to null
           * to prevent it from being called again by the data channel.
           */
          this.onCloseCallback = null;
          break;
      }
    };
  }

  private setOnDisconnectionCloseCallback() {
    this.disconnectionChannel.onclose = () => {
      this.onCloseCallback && this.onCloseCallback();

      /*
       * Once we have called the onClose callback, set it to null
       * to prevent it from being called again by the peer connection.
       */
      this.onCloseCallback = null;
    };
  }

  private setOnTrackAddCallback() {
    /*
     * Saves the last received media stream. Seeing as we are only
     * sending one media type, it is ok to just save the last one
     * that we receive.
     */
    this.ontrack = ({ streams: [stream] }) => {
      this.remoteStream = stream;
    };
  }

  async setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void> {
    await super.setRemoteDescription(description);

    /*
     * Any queued ice candidates need adding.
     */
    for (const candidate of this.iceCandidates) {
      super.addIceCandidate(candidate);
    }
  }

  async addIceCandidate(candidate: RTCIceCandidate): Promise<void> {
    if (this.remoteDescription?.type) {
      await super.addIceCandidate(candidate);
    } else {
      /*
       * If there is no remote description then the ice candidate
       * needs queing (it will be added later, once a remote
       * description is available).
       * https://stackoverflow.com/a/42977150/15251047
       */
      this.iceCandidates.push(candidate);
    }
  }

  close(): void {
    this.disconnectionChannel.close();
    super.close();
  }
}
