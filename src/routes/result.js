import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import CoursesController from '../controllers/courses';

const router = express.Router();
router.post('/result/:languageId/:courseId', verifyToken.headerToken, CoursesController.addTestResult);

export default router;
