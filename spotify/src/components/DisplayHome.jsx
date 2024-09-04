import React from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItems from './SongItems'
import { createContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { useContext } from 'react'

const DisplayHome = () => {
    const {songsData,albumsData} = useContext(PlayerContext)
  return (
    // For Showing album and Songs
    <div>
        <Navbar/>
        <div className='mb-4'>
            <h1 className='my-2 font-bold text-2xl'>Featured Charts</h1>
            <div className='flex overflow-auto'>
            {
                albumsData.map((data,index)=>{
                   const {image,name,desc,_id} = data;
                   return (<AlbumItem key={index} image={image} name={name} desc={desc} id={_id} />)     
                })
            }
            </div>
        </div>
        <div className='mb-4'>
            <h1 className='my-2 font-bold text-2xl'>Today Biggest Hits</h1>
            <div className='flex overflow-auto'>
            {
                songsData.map((item,index)=>{
                    const {image,name,desc,_id} = item;
                    return (<SongItems key={index} name={name} desc={desc} id={_id} image={image}/>)
 
                })
            }
            </div>
        </div>
        <div className='mb-4'>
            <h1 className='my-2 font-bold text-2xl'>Featured Charts</h1>
            <div className='flex overflow-auto'>
            {
                albumsData.map((data,index)=>{
                   const {image,name,desc,_id} = data;
                   return (<AlbumItem key={index} image={image} name={name} desc={desc} id={_id} />)     
                })
            }
            </div>
        </div>
    </div>
  )
}

export default DisplayHome