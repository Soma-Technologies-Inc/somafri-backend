import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import TranslateController from '../controllers/translate.controller';
import MusicsController from '../controllers/musics.controller';

const router = express.Router();

router.post('/', verifyToken.headerToken, TranslateController.translateWords);

export default router;
