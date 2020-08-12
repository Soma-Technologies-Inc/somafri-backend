<<<<<<< HEAD
import express from 'express';
import userRoute from './users';

const Router = express.Router();
Router.use('/auth', userRoute);
=======
 
import express from 'express';
import musicRoute from './musics.routes';


const Router = express.Router();
Router.use('/music', musicRoute);
>>>>>>> ft(music):

export default Router;