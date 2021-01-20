import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import ContentsController from '../controllers/content';

const router = express.Router();

router.post('/', verifyToken.headerToken, ContentsController.addContentsFromTranslate);

export default router;
