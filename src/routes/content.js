import express from 'express';
import isValid from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import Validate from '../helpers/validate';
import RootContentController from '../controllers/content.root';
import ContentsController from '../controllers/content';
import verifyAdmin from '../middlewares/verify.admin';
import courseMiddleware from '../middlewares/courses.middleware';
import uploadImages from '../middlewares/uploadImages';

const router = express.Router();

router.post('/rootContent', verifyToken.headerToken, verifyAdmin, [

	uploadImages.fields([{
		name: 'contentImage', maxCount: 1,
	}, {
		name: 'contentAudio', maxCount: 1,
	}]),
	courseMiddleware.findIfRootCourseExist,
	Validate.rootContent(),
	isValid,
	RootContentController.addContent,
]);

router.get(
	'/rootContent',
	verifyToken.headerToken,
	verifyAdmin,
	RootContentController.getRootContents,
);

router.delete(
	'/rootContent/:id',
	verifyToken.headerToken,
	verifyAdmin,
	RootContentController.deleteContent,
);

router.patch(
	'/rootContent/:id',
	verifyToken.headerToken, verifyAdmin, uploadImages.fields([{
		name: 'contentImage', maxCount: 1,
	}, {
		name: 'contentAudio', maxCount: 1,
	}]),
	RootContentController.editRootContent,
);

// Contents routes

router.post(
	'/:language',
	verifyToken.headerToken,
	verifyAdmin,
	[
		uploadImages.single('contentAudio'),
		Validate.content(),
		isValid,
		ContentsController.addContent,
	],
);

router.patch(
	'/:id',
	verifyToken.headerToken, verifyAdmin, uploadImages.fields([{
		name: 'contentAudio', maxCount: 1,
	}]),
	ContentsController.editContent,
);

router.delete(
	'/:id',
	verifyToken.headerToken,
	verifyAdmin,
	ContentsController.deleteContent,
);
router.get('/search', verifyToken.headerToken, verifyAdmin, ContentsController.searchContent);

export default router;
