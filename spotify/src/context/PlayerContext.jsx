import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
// Create a context
export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  // For audio control
  const audioRef = useRef(null);  // Initialize with null
  // For the audiobar control
  const seekBg = useRef(null);    // Initialize with null
  const seekBar = useRef(null);   // Initialize with null

  const url= 'http://localhost:4000'

  const [songsData , setSongData] = useState([]);
  const [albumsData , setAlbumData] = useState([]);


  // For the Song file
  const [track, setTrack] = useState(songsData[0]);
  //For our song status
  const [playStatus, setPlayStatus] = useState(false);
  // Note the time of our songs
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  // function for songs play
  const play = () => {
    if (audioRef.current) {  // Check if audioRef.current is not null
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // function for songs pause

  const pause = () => {
    if (audioRef.current) {  // Check if audioRef.current is not null
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  // function for play SOngs with their ids
  const playWithId = async(id) =>{
      await songsData.map((item) =>{
        if(id === item._id){
          setTrack(item);
        }
      })

      await audioRef.current.play();
      setPlayStatus(true)
  }

  // For pervious song
  const pervious = async () =>{
    songsData.map(async(item ,index)=>{
      if(track._id === item._id && index > 0){
        await setTrack(songsData[index-1]);
        await audioRef.current.play();
        setPlayStatus(true)
      }
    })
  }
// For Next Song
  const next = async () =>{
    songsData.map(async(item ,index)=>{
      if(track._id === item._id && index < songsData.length){
        await setTrack(songsData[index+1]);
        await audioRef.current.play();
        setPlayStatus(true)
      }
    })
  }
// For control the song bar
  const seekSong = async(e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration);
  }

  
// for getting songs data from an api
const getSongData = async() =>{
  try {
    const res = await axios.get(`${url}/api/song/list`);
    setSongData(res.data.song);
    setTrack(res.data.song[0])
  } catch (error) {
    console.log(error);
    
  }
}

// for getting songs data from an api
const getAlbumData = async() =>{
  try {
    const res = await axios.get(`${url}/api/album/list`);
    setAlbumData(res.data.album);
  } catch (error) {
    console.log(error);
    
  }
}
  useEffect(() =>{
    // For playing the song Time funtionality
    setTimeout(() =>{
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second:Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        })
      }
    },1000)
  },[audioRef])

  useEffect(()=>{
    getSongData();
    getAlbumData();
  },[])

  return (
    <PlayerContext.Provider value={
  {   audioRef,
      seekBar,
      seekBg,
      track,
      setTrack,
      playStatus,
      setPlayStatus,
      time,
      setTime,
      play,
      pause,
      playWithId, 
      pervious, 
      next,
      seekSong,
      songsData,
      albumsData
    }}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
