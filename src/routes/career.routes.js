import { Router } from 'express';
import CareerController from '../controllers/career.controller';
import Validate from '../helpers/validate';
import isValid from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verify.admin';

const router = Router();

router.get('/', CareerController.getOpenCareer);
router.post(
	'/',
	verifyToken.headerToken,
	verifyAdmin,
	Validate.career(),
	isValid,
	CareerController.createCareer
);
router.patch(
	'/:id',
	verifyToken.headerToken,
	verifyAdmin,
	CareerController.updateCareer
);

export default router;
