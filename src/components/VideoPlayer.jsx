import { useContext } from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideoRef,
    userVideoRef,
    callended,
    stream,
    call,
  } = useContext(SocketContext);

  return (
    <main>
      {/* my video */}
      {stream && (
        <div>
          <p>{name || 'me'}</p>
          <video
            playsInline
            muted
            width="400"
            ref={myVideoRef}
            autoPlay
            className=""
          />
        </div>
      )}
      {/* user video */}
      {callAccepted && !callended && (
        <div>
          <p>{call.name || 'your friend'}</p>
          <video
            playsInline
            width="400"
            height="300"
            ref={userVideoRef}
            autoPlay
            className=""
          />
        </div>
      )}
    </main>
  );
};

export default VideoPlayer;
