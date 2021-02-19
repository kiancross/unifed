/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import Video from "./Video";

const VideoWrapper = (): ReactElement | null => {
  const localMediaStream = null;
  const localMedia = localMediaStream ? <Video stream={localMediaStream} /> : null;
  const remoteMedia = null;

  return (
    <div>
      <div>{remoteMedia}</div>
      <div>{localMedia}</div>
    </div>
  );
};

export default VideoWrapper;
