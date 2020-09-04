import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import CoursesController from '../controllers/courses';
import verifyAdmin from '../middlewares/verify.admin';
import courseMiddleware from '../middlewares/courses.middleware';
import uploadImages from '../middlewares/uploadImages';

const router = express.Router();
/**
 * @swagger
 *
 * /courses/add-root-courses:
 *    post:
 *      summary: Create root courses
 *      tags: [Courses]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RootCouseRequest'
 *      responses:
 *        "201":
 *          description: root course schema
 *
 * components:
 *    schemas:
 *      RootCouseRequest:
 *        type: object
 *        required:
 *          - name
 *          - languageId
 *          - levelId
 *          - complexity
 *        properties:
 *          name:
 *            type: string
 *          languageId:
 *            type: integer
 *          levelId:
 *            type: integer
 *          complexity:
 *            type: integer
 */
router.post('/add-root-courses', verifyToken.headerToken, verifyAdmin, uploadImages.single('courseIcon'), courseMiddleware.findIfLanguageExist, courseMiddleware.findIfLevelExist, CoursesController.createRootCourses);
router.post('/add-courses', verifyToken.headerToken, verifyAdmin, courseMiddleware.findIfLanguageExist, courseMiddleware.findIfRootCourseExist, CoursesController.createCourses);
export default router;
