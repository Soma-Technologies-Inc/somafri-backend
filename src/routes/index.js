
import express from 'express';
import userRoute from './users';
import musicRoute from './musics.routes';
import videoRoute from './video.routes';
import translateRoute from './translate.routes';
import coursesRoute from './courses';
import contentRoute from './content';

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/courses', coursesRoute);
Router.use('/music', musicRoute);
Router.use('/video', videoRoute);
Router.use('/translate', translateRoute);
Router.use('/content', contentRoute);



export default Router;