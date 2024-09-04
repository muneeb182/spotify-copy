import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const [data , setData] = useState([]);

  const fetchAlbum = async() => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      
      if(response.data.success){
       setData(response.data.album);
      }
      
      
    } catch (error) {
      toast.error('Error Occured');
      
    }
  }

  const deleteAlbum = async(id) =>{
    try {
      const response = await axios.post(`${url}/api/album/remove`,{id}); 
      await fetchAlbum();
      if(response){
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error('Error Occured')
    }
  }

  useEffect(()=>{
    fetchAlbum()
  },[])
  return (
    <div>
      <p className='mb-4'>All Albums List</p>
      <div>
        <div className='sm:grid hidden grid-cols-[1fr_2fr_3fr_2fr_3fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Actions</b>
        </div>
        {
          data.map((item,index)=>{
            return <div key={index} className='grid grid-cols-[1fr_2fr_3fr_2fr_3fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.desc}</p>
                <input type="color" value={item.bgColour} />
                <p className='cursor-pointer' onClick={() => deleteAlbum(item._id)}>!!</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default ListAlbum