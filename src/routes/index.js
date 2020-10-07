
import express from 'express';
import userRoute from './users';
import musicRoute from './musics.routes';
import videoRoute from './video.routes';
import translateRoute from './translate.routes';
import coursesRoute from './courses';
import contentRoute from './content';
import countryRoute from './country';
import languageRouter from './language';
import addCourseTranslate from './addCourses.routes';
import addContents from './addContents.routes';



const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/courses', coursesRoute);
Router.use('/music', musicRoute);
Router.use('/country', countryRoute);
Router.use('/language', languageRouter);
Router.use('/video', videoRoute);
Router.use('/translate', translateRoute);
Router.use('/content', contentRoute);
Router.use('/add-courses', addCourseTranslate);
Router.use('/add-contents', addContents);




export default Router;