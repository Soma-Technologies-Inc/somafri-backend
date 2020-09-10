import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import ContentsController from '../controllers/contents.controller';

const router = express.Router();

router.post('/',verifyToken.headerToken,ContentsController.addContentsFromTranslate);

export default router;
