import { Router } from 'express';
import SurveyController from '../controllers/survey.controller';
import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verify.admin';
import Validate from '../helpers/validate';
import isValid from '../middlewares/validate';

const router = Router();

router.post(
	'/',
	verifyToken.headerToken,
	Validate.survey(),
	isValid,
	SurveyController.createSurvey
);

router.get(
	'/isSubmitted',
	verifyToken.headerToken,
	verifyAdmin,
	SurveyController.isSubmitted
);

router.get(
	'/',
	verifyToken.headerToken,
	verifyAdmin,
	SurveyController.retrieveAllSurveys
);

export default router;
