import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import MusicsController from '../controllers/musics.controller';
import verifyAdmin from '../middlewares/verify.admin';
import uploadImages from '../middlewares/uploadImages';
import Validate from '../helpers/validate';


const router = express.Router();

router.post('/',verifyToken.headerToken,verifyAdmin,uploadImages.single('music'), Validate.music(), MusicsController.addMusic);

export default router;