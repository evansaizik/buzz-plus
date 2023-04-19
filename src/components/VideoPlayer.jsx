import { useContext } from 'react';
import { SocketContext } from '../SocketContext';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const {
    callAccepted,
    // myVideoRef,
    userVideoRef,
    callended,
    stream,
    call,
  } = useContext(SocketContext);

  return (
    <main
      style={
        !callAccepted && callended
          ? {
              minWidth: '370px',
              margin: 'auto',
              maxWidth: '800px',
              height: '70vh',
              position: 'relative',
            }
          : {
              // paddingTop: '50px',
              minWidth: '370px',
              margin: 'auto',
              maxWidth: '800px',
              height: '60vh',
              position: 'relative',
            }
      }
    >
      {/* my video */}
      <div
        style={
          callAccepted && !callended
            ? {
                width: '45%',
                right: '10px',
                bottom: '0',
                margin: '10px',
                borderRadius: '20%',
                maxWidth: '250px',
                position: 'absolute',
                zIndex: '1',
              }
            : { width: '100%', height: '60vh' }
        }
      >
        {stream && (
          <ReactPlayer width="100%" height="100%" url={stream} playing muted />
        )}
      </div>
      {/* user video */}
      {callAccepted && !callended && (
        <div
          style={{
            width: '100%',
            height: '100%',
            // background: 'gray',
            position: 'absolute',
          }}
        >
          <p>{call.name || 'your friend'}</p>
          <video
            playsInline
            width="100%"
            height="90%"
            ref={userVideoRef}
            autoPlay
          />
        </div>
      )}
    </main>
  );
};

export default VideoPlayer;
