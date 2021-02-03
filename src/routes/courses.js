import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import CoursesController from '../controllers/courses';
import verifyAdmin from '../middlewares/verify.admin';
import courseMiddleware from '../middlewares/courses.middleware';
import uploadImages from '../middlewares/uploadImages';

const router = express.Router();

router.post('/add-root-courses', verifyToken.headerToken, verifyAdmin, uploadImages.single('courseIcon'), courseMiddleware.findIfLanguageExist, courseMiddleware.findIfLevelExist, CoursesController.createRootCourses);
router.post('/add-courses', verifyToken.headerToken, verifyAdmin, courseMiddleware.findIfLanguageExist, courseMiddleware.findIfRootCourseExist, CoursesController.createCourses);
router.get('/recent', verifyToken.headerToken, CoursesController.recentCourses);
router.get('/language-courses/:languageId', verifyToken.headerToken, CoursesController.getLanguageCourses);
router.get('/learn-language/:languageId/:courseId', verifyToken.headerToken, CoursesController.getLearnContents);

export default router;
