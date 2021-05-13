/*
 * Copyright (C) 2021 Kian Cross
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

/*
 * There are some bugs with the implementation of RTCPeerConnection on
 * some browsers. This wrapper attempts to abstract over these issues
 * so that it can be used transparently within other code (without
 * having to worry about the edge cases). Safari does not allow
 * RTCPeerConnection to be extended, so we must encapsulate in
 * rather than extend it (which would have been preferable).
 *
 * In addition to the above, this wrapper adds some convenience
 * events, such as `onclose` and `onready`. These merge multiple
 * internal events into a single one.
 *
 * Finally, a data channel is added to handle disconnections
 * gracefully.
 */

import "webrtc-adapter";

type ReadyCallback = ((remoteStream: MediaStream | undefined) => void) | undefined | null;
type CloseCallback = (() => void) | undefined | null;

export class SafePeerConnection {
  readonly super: RTCPeerConnection;

  private iceCandidates: RTCIceCandidate[] = [];
  private disconnectionChannel: RTCDataChannel;

  private remoteStream: MediaStream | undefined;

  private onReadyCallback: ReadyCallback;
  private onCloseCallback: CloseCallback;

  constructor(
    configuration?: RTCConfiguration,
    localStream?: MediaStream | null,
    base = RTCPeerConnection,
  ) {
    this.super = new base(configuration);

    localStream?.getTracks().forEach((track) => this.super.addTrack(track, localStream));

    // Create a data channel for signalling disconnections.
    this.disconnectionChannel = this.super.createDataChannel("disconnection", {
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
    const connected = this.super.iceConnectionState === "connected";

    // If the frame rate is greater than 0 then the video is ready.
    //
    // On Safari, frameRate is undefined, so the strict equality check
    // with 0 is essential.
    const videoReady = videoTracks && videoTracks[0].getSettings().frameRate !== 0;

    return !!(connected && (videoTracks === undefined || videoReady));
  }

  private setIceConnectionStatusCallback() {
    this.super.oniceconnectionstatechange = () => {
      let intervalReference: NodeJS.Timeout | undefined = undefined;

      switch (this.super.iceConnectionState) {
        case "connected": {
          /*
           * Waits until the remote video connection is ready
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
    this.super.ontrack = ({ streams: [stream] }) => {
      this.remoteStream = stream;
    };
  }

  async setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void> {
    await this.super.setRemoteDescription(description);

    /*
     * Any queued ice candidates need adding.
     */
    for (const candidate of this.iceCandidates) {
      this.super.addIceCandidate(candidate);
    }
  }

  async addIceCandidate(candidate: RTCIceCandidate): Promise<void> {
    if (this.super.remoteDescription?.type) {
      await this.super.addIceCandidate(candidate);
    } else {
      /*
       * If there is no remote description then the ice candidate
       * needs queuing (it will be added later, once a remote
       * description is available).
       * https://stackoverflow.com/a/42977150/15251047
       */
      this.iceCandidates.push(candidate);
    }
  }

  close(): void {
    this.disconnectionChannel.close();
    this.super.close();
  }
}
