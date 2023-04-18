import { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../SocketContext';

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, leaveCall, callUser, callEnded } =
    useContext(SocketContext);


  const [idToCall, setIdToCall] = useState('');

  return (
    <section>
      <form>
        <p>account Info</p>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <CopyToClipboard text={me} className="">
          <button onClick={(e) => e.preventDefault()}>Copy your ID</button>
        </CopyToClipboard>
      </form>
      <form>
        <p>Make a call</p>
        <input
          type="text"
          value={idToCall}
          placeholder="ID to call"
          onChange={(e) => setIdToCall(e.target.value)}
        />
        {callAccepted && !callEnded ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              leaveCall()
            }}
          >
            End Call
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              callUser(idToCall);
            }}
          >
            Call
          </button>
        )}
      </form>
      {children}
    </section>
  );
};

export default Options;
