import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const AddAlbum = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(false);
  const [colour, setColour] = useState("#ffffff");
  const [loading, setLoading] = useState(false);

  const onSubmitHandlers = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name',name);
      formData.append('desc',desc);
      formData.append('image',image);
      formData.append('bgColour',colour);
  
      const response = await axios.post(`${url}/api/album/add`,formData);
      
      if(response.data.success){
        toast.success('Album added successfully');
        setName("");
        setDesc("");
        setImage(false);
        setColour('#ffffff');
      }
      else {
        toast.error("Something went wrongs...");
      }
    } catch (error) {
      toast.error('Error Occured Here')
    }
    setLoading(false)
    
  }


  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin "></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandlers} className="flex flex-col items-start gap-8 text-gray-600">
      <div className="flex flex-col gap-2.5">
        <p>Upload Image</p>
        <input type="file" id="image" accept="image/*" hidden  
            onChange={(e) => setImage(e.target.files[0])}
         
         />
        <label htmlFor="image">
          <img
            className="w-24 cursor-pointer"
            src={image ? URL.createObjectURL(image):assets.upload_area}
            alt=""
          />
        </label>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Description</p>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p>BackGround Colour</p>
        <input onChange={(e) => setColour(e.target.value)} value={colour} type="color" />
      </div>
      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
      >
        Add Album
      </button>
    </form>
  );
};

export default AddAlbum;
 