import express from 'express';
import isValid from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import Validate from '../helpers/validate';
import CountryController from '../controllers/country';
import verifyAdmin from '../middlewares/verify.admin';
import uploadImages from '../middlewares/uploadImages';

const router = express.Router();

router.post('/', verifyToken.headerToken, verifyAdmin, [
	uploadImages.single('flag'),
	Validate.country(),
	isValid,
	CountryController.addCountry,
]);

export default router;
