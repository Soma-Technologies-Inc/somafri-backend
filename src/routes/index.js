import express from 'express';
import userRoute from './users';

const Router = express.Router();
Router.use('/auth', userRoute);

export default Router;