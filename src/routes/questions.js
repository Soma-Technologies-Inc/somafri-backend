import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import QuestionsController from '../controllers/questions';
import verifyAdmin from '../middlewares/verify.admin';
import questionMiddleware from '../middlewares/question.middleware';
import courseMiddleware from '../middlewares/courses.middleware';

const router = express.Router();
router.post('/add-root-question', verifyToken.headerToken, verifyAdmin, questionMiddleware.checkIfRootCourseExist, QuestionsController.addRootQuestion);
router.post('/add-question', verifyToken.headerToken, verifyAdmin, courseMiddleware.findIfLanguageExist, questionMiddleware.checkIfRootQuestionExist, QuestionsController.addQuestion);
router.get('/root-question', verifyToken.headerToken, verifyAdmin, QuestionsController.getRootQuestion);
router.get('/', verifyToken.headerToken, verifyAdmin, QuestionsController.getQuestion);
router.get('/test/:languageId/:courseId', verifyToken.headerToken, QuestionsController.getTests);

export default router;
