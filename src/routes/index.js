 
import express from 'express';
import musicRoute from './musics.routes';


const Router = express.Router();
Router.use('/music', musicRoute);

export default Router;