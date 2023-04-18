import Notifications from "./components/Notifications";
import Options from "./components/Options";
import VideoPlayer from "./components/VideoPlayer";

const App = () => {
  return (
    <div>
      <h1 className="title">BUZZ+</h1>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};

export default App;
