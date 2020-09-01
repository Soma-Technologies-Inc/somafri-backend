
import express from 'express';
import userRoute from './users';
import musicRoute from './musics.routes';
import videoRoute from './video.routes';
import translateRoute from './translate.routes';

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/music', musicRoute);
Router.use('/video', videoRoute);
Router.use('/translate', translateRoute);


export default Router;