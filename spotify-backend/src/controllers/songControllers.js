import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";
const addSong = async(req,res) =>{
    try {
        // initialize the properties
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        // For upload audio in our cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path,{resource_type:"video"});
        // For upload image in our cloudinary   
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`

        const  songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = songModel(songData);
        await song.save();

        res.json({success: true , message :'Song Added'});
        
    } catch (error) {
        res.json({success:false});
    }
}

const listSong = async(req,res) =>{
    // show all the songs
    try {
    const allSongs = await songModel.find({});  
     res.json({success:'true',song:allSongs})   
    } catch (error) {
        res.json({success: false})
    }
}

const removeSong = async(req,res) =>{
    // remove the songs
    try {
        
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success:true , message:'Song Removed'})
    } catch (error) {
        res.json({success: false})
        
    }
}

export {addSong , listSong , removeSong}