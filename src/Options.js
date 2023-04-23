import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Options = ({ variables }) => {
  const { me, callAccepted, leaveCall, callUser, callEnded } = variables;
  const [idToCall, setIdToCall] = useState('');

  return (
    <div>
      <form>
        <CopyToClipboard text={me}>
          <button onClick={(e) => e.preventDefault()}>Copy your ID</button>
        </CopyToClipboard>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          callUser(idToCall);
        }}
      >
        <label htmlFor="call">Make A Call:</label>
        <input
          id="call"
          placeholder="ID to call"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}>Hang Up</button>
        ) : (
          <button>Call</button>
        )}
      </form>
    </div>
  );
};

export default Options;
