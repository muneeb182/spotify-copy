import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListSong = () => {
  const [data , setData] = useState([]);

  const fetchSong = async() => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      
      if(response.data.success){
       setData(response.data.song);
      }
      
      
    } catch (error) {
      toast.error('Error Occured');
      
    }
  }

  const deleteSong = async(id) =>{
    try {
      const response = await axios.post(`${url}/api/song/remove`,{id}); 
      await fetchSong();
      if(response){
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error('Error Occured')
    }
  }

  useEffect(()=>{
    fetchSong()
  },[])
  return (
    <div>
      <p className='mb-4'>All Songs List</p>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Actions</b>
        </div>
        {
          data.map((item,index)=>{
            return <div key={index} className='grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.album}</p>
                <p>{item.duration}</p>
                <p className='cursor-pointer' onClick={() => deleteSong(item._id)}>!!</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default ListSong