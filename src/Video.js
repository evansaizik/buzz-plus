const Video = ({ variables }) => {
  const { callAccepted, callEnded, userVideo, myVideo } =
    variables;

  return (
    <section>
        <div style={{ width: '300px', height: '300px' }}>
          <video
            ref={myVideo}
            autoPlay
            width="100%"
            height="100%"
            playsInline
            muted
          />
        </div>
      {callAccepted && !callEnded && (
        <div style={{ width: '300px', height: '300px' }}>
          <video
            ref={userVideo}
            autoPlay
            width="100%"
            height="100%"
            playsInline
          />
        </div>
      )}
    </section>
  );
};

export default Video;
