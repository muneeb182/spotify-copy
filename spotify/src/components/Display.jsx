import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayALbum";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { songsData } from "../assets/assets";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);

  // Create a variable with useRef
  const displayRef = useRef();
  // For see our current location
  const location = useLocation();
  // For see any page these path includes
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  // album background colors
  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((x) => x._id == albumId).bgColour
      : "#121212";

  // Add Colors for playlist
  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  });

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4  rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg: ml-0"
    >
      {songsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((x) => x._id === albumId)} />
            }
          />
        </Routes>
      ) : null}
    </div>
  );
};

export default Display;
