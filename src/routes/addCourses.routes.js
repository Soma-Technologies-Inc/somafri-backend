import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import CoursesController from '../controllers/courses.controller';

const router = express.Router();

router.post('/',verifyToken.headerToken,CoursesController.addCoursesFromTranslate);

export default router;
