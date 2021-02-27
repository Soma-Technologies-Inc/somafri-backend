import express from 'express';
import userRoute from './users';
import musicRoute from './musics.routes';
import videoRoute from './video.routes';
import translateRoute from './translate.routes';
import coursesRoute from './courses';
import contentRoute from './content';
import countryRoute from './country';
import languageRouter from './language';
import learningRoute from './learning';
import addCourseTranslate from './addCourses.routes';
import addContents from './addContents.routes';
import dailyWord from './dailyWord';
import careerRoute from './career.routes';
import surveyRoute from './survey.routes';
import userProfileRoute from './userProfile';
import questionRoute from './questions';
import testRoute from './result';
import contactRoute from './contact';
import uploader from './uploader';

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/profile', userProfileRoute);
Router.use('/courses', coursesRoute, testRoute);
Router.use('/music', musicRoute);
Router.use('/country', countryRoute);
Router.use('/language', languageRouter);
Router.use('/languages', learningRoute);
Router.use('/video', videoRoute);
Router.use('/translate', translateRoute);
Router.use('/content', contentRoute);
Router.use('/add-courses', addCourseTranslate);
Router.use('/add-contents', addContents);
Router.use('/dailyWord', dailyWord);
Router.use('/career', careerRoute);
Router.use('/survey', surveyRoute);
Router.use('/questions', questionRoute);
Router.use('/contact', contactRoute);
Router.use('/uploader', uploader);

export default Router;
