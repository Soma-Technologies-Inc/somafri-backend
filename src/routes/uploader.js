import express from 'express';
import uploaderController from '../controllers/uploader';
import uploadImages from '../middlewares/uploadImages';

const router = express.Router();

router.post('/', uploadImages.single('media'),
	uploaderController.uploadFiles);

export default router;
