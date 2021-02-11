import express from 'express';
import isValid from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import Validate from '../helpers/validate';
import LanguageController from '../controllers/language';
import verifyAdmin from '../middlewares/verify.admin';
import LanguageMiddleware from '../middlewares/languages.middleware';

const router = express.Router();

router.get('/', [LanguageController.getLanguages]);
router.post('/', verifyToken.headerToken, verifyAdmin, [
	Validate.language(),
	isValid,
	LanguageController.addLanguage,
]);
router.post('/add-language', verifyToken.headerToken, LanguageMiddleware.checkIfLanguageExist, LanguageMiddleware.checkIfUserAlreadyEnrolled, LanguageController.enrollToLanguage);

router.get('/country/:countryName', verifyToken.headerToken, [
	LanguageController.getLanguagesByCountry,
]);

router.get('/users-learningLanguages', verifyToken.headerToken, verifyAdmin, LanguageController.getUsersLearningLanguages);

router.get('/top', verifyToken.headerToken, [
	LanguageController.topLanguage,
]);

router.get('/:id', verifyToken.headerToken, [
	LanguageController.singleLanguage,
]);

export default router;
