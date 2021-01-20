import express from 'express';
import isValid from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import Validate from '../helpers/validate';
import LanguageController from '../controllers/language';
import verifyAdmin from '../middlewares/verify.admin';
import LanguageMiddleware from '../middlewares/languages.middleware';

const router = express.Router();

router.post('/', verifyToken.headerToken, verifyAdmin, [
	Validate.language(),
	isValid,
	LanguageController.addLanguage,
]);
export default router;
