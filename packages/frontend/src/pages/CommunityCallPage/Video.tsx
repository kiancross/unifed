/*
 * CS3099 Group A3
 */

// Taken some code from
// https://blog.logrocket.com/responsive-camera-component-react-hooks/

import { ReactElement, useRef, useEffect } from "react";

const Video = (props: { stream?: MediaStream | MediaSource; muted?: boolean }): ReactElement => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCanPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    if (props.stream && videoRef.current && videoRef.current.srcObject !== props.stream) {
      videoRef.current.srcObject = props.stream;
    }
  }, [videoRef, props.stream]);

  return (
    <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted={props.muted} />
  );
};

export default Video;
