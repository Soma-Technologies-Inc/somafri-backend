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
/**
 * @swagger
 *
 * /content/search?content={targetContent}:
 *    get:
 *      summary: Create root courses
 *      tags: [Contents]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: targetContent
 *         in: path
 *         description: enter your desire word
 *         required: true
 *         type: string
 *      responses:
 *        "200":
 *          description: Content found
 *
 */
/**
 * @swagger
 *
 * /content/{contentId}:
 *    patch:
 *      summary: Update content
 *      tags: [Contents]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: contentId
 *         in: path
 *         description: enter content id
 *         required: true
 *         type: integer
 *       - name: content
 *         in: formData
 *         description: enter content
 *         type: string
 *       - name: contentAudio
 *         in: formData
 *         type: file
 *         format: file
 *         description: enter content
 *      responses:
 *        "201":
 *          description: root course schema
 * components:
 *    schemas:
 *      EditContent:
 *        type: object
 *        required:
 *          - content
 *          - contentAudio
 *        properties:
 *          content:
 *            type: string
 *          contentAudio:
 *            type: file
 */
/**
 * @swagger
 *
 * /content/rootContent/{contentId}:
 *    patch:
 *      summary: Update root content
 *      tags: [Contents]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: contentId
 *         in: path
 *         description: enter content id
 *         required: true
 *         type: integer
 *       - name: rootCourseId
 *         in: formData
 *         description: enter content
 *         type: integer
 *       - name: chapter
 *         in: formData
 *         description: enter content
 *         type: integer
 *       - name: content
 *         in: formData
 *         description: enter content
 *         type: string
 *       - name: contentImage
 *         in: formData
 *         type: file
 *         format: file
 *         description: content image
 *       - name: contentAudio
 *         in: formData
 *         type: file
 *         format: file
 *         description: content audio
 *      responses:
 *        "201":
 *          description: root course schema
 * components:
 *    schemas:
 *      EditRootContent:
 *        type: object
 *        required:
 *          - rootCourseId
 *          - chapter
 *          - content
 *          - contentImage
 *          - contentAudio
 *        properties:
 *          rootCourseId:
 *            type: integer
 *          chapter:
 *            type: integer
 *          content:
 *            type: string
 *          contentImage:
 *            type: file
 *          contentAudio:
 *            type: file
 */
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
