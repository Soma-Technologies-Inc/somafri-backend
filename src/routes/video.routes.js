import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import VideosController from '../controllers/video.controller';
import verifyAdmin from '../middlewares/verify.admin';
import uploadImages from '../middlewares/uploadImages';
import Validate from '../helpers/validate';

const router = express.Router();

router.post('/', verifyToken.headerToken, verifyAdmin, uploadImages.single('video'), Validate.video(), VideosController.addVideo);

export default router;
