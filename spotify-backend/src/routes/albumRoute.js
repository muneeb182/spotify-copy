import express from 'express'
import upload from '../middlewares/multer.js';
import { addAlbum, listAlbum, removeAlbum } from '../controllers/albumControllers.js';

// For creating routes
const albumRouter =express.Router();

albumRouter.post('/add',upload.single('image'),addAlbum);
albumRouter.get('/list',listAlbum);
albumRouter.post('/remove',removeAlbum);

export default albumRouter;