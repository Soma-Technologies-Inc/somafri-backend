 
import express from 'express';
import musicRoute from './musics.routes';
import videoRoute from './video.routes';


const Router = express.Router();
Router.use('/music', musicRoute);
Router.use('/video', videoRoute);

export default Router;