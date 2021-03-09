import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import CoursesController from '../controllers/courses';
import verifyAdmin from '../middlewares/verify.admin';
import courseMiddleware from '../middlewares/courses.middleware';
import uploadImages from '../middlewares/uploadImages';

const router = express.Router();

router.post(
	'/add-root-courses',
	verifyToken.headerToken,
	verifyAdmin,
	uploadImages.single('courseIcon'),
	courseMiddleware.findIfLanguageExist,
	courseMiddleware.findIfLevelExist,
	CoursesController.createRootCourses
);
router.patch(
	'/add-root-courses/:id',
	verifyToken.headerToken,
	verifyAdmin,
	courseMiddleware.findIfRootCourse,
	uploadImages.fields([
		{
			name: 'courseIcon',
			maxCount: 1,
		},
	]),
	courseMiddleware.findIfRootLanguage,
	courseMiddleware.findIfLevelExist,
	CoursesController.editRootCourse
);

router.delete(
	'/add-root-courses/:id',
	verifyToken.headerToken,
	verifyAdmin,
	courseMiddleware.findIfRootCourse,
	CoursesController.deleteRootCourses
);

router.get('/root', verifyToken.headerToken, CoursesController.getRootCourses);
router.post(
	'/add-courses',
	verifyToken.headerToken,
	verifyAdmin,
	courseMiddleware.findIfLanguageExist,
	courseMiddleware.findIfRootCourseExist,
	CoursesController.createCourses
);

router.patch(
	'/:id',
	verifyToken.headerToken,
	verifyAdmin,
	courseMiddleware.findIfCourse,
	CoursesController.editCourse
);

router.delete(
	'/:id',
	verifyToken.headerToken,
	verifyAdmin,
	courseMiddleware.findIfCourse,
	CoursesController.deleteCourse
);

router.get('/recent', verifyToken.headerToken, CoursesController.recentCourses);
router.get(
	'/language-courses/:languageId',
	verifyToken.headerToken,
	CoursesController.getLanguageCourses
);
router.get(
	'/learn-language/:languageId/:courseId',
	verifyToken.headerToken,
	CoursesController.getLearnContents
);
router.get(
	'/contents/:languageId/:courseId',
	verifyToken.headerToken,
	verifyAdmin,
	CoursesController.getCourseContents
);

export default router;
