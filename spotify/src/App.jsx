import { useContext } from "react";
import Display from "./components/Display";
import MusicPlayer from "./components/MusicPlayer";
import SideBar from "./components/SideBar";
import { PlayerContext } from "./context/PlayerContext";

function App() {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <>
      <div className="h-screen bg-black">
        {songsData.length !== 0 ? (
          <>
            <div className="h-[90%] flex">
              <SideBar />
              <Display />
            </div>
            <MusicPlayer />
          </>
        ) : null}
        <audio ref={audioRef} src={track ? track?.file: ''} preload="auto"></audio>
      </div>
    </>
  );
}

export default App;
