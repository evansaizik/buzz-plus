import './App.css';
import io from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import Chat from './Chat';
import Video from './Video';
import Options from './Options';
import Notifications from './Notifications';

const socket = io.connect('https://vidchatter.herokuapp.com');
// const socket = io.connect('http://localhost:8080');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
    socket.on('me', (id) => setMe(id));
    socket.on('call_user', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('answer_call', { signal: data, to: call.from });
    });
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('call_user', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('call_accepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <section style={{ display: 'flex' }}>
        <div>
          <Video
            variables={{
              call,
              callAccepted,
              myVideo,
              userVideo,
              stream,
              name,
              setName,
              callEnded,
              me,
              callUser,
              leaveCall,
              answerCall,
            }}
          />
          <Options
            variables={{
              me,
              callAccepted,
              leaveCall,
              callUser,
              callEnded,
              setName,
              name,
            }}
          />
          <Notifications variables={{ username, answerCall, call, callAccepted }} />
        </div>
      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>BUZZ PL+S</h3>
            <input
              type="text"
              placeholder="John..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </section>
  );
}

export default App;
