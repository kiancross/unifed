/*
 * CS3099 Group A3
 */

import { ReactElement } from "react";
import Video, { VideoProps } from "./Video";

const VideoWrapper = (props: { streams: VideoProps[] }): ReactElement => {
  return (
    <div>
      {props.streams
        .filter((wrapper) => wrapper.stream !== undefined)
        .map((wrapper) => (
          <Video key={wrapper.stream?.id} stream={wrapper.stream} muted={wrapper.muted} />
        ))}
    </div>
  );
};

export default VideoWrapper;
