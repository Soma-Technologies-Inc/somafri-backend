import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import LanguageController from '../controllers/language';

const router = express.Router();

router.get('/enrolled', verifyToken.headerToken, LanguageController.getEnrolledLanguages);
export default router;
