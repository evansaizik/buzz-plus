const Notifications = ({ variables }) => {
  const { answerCall, call, callAccepted, username } = variables;

  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h4>{username || 'Someone'} is calling:</h4>
          <button onClick={answerCall}>Answer</button>
        </div>
      )}
    </>
  );
};

export default Notifications;
