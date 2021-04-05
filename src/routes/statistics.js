import express from 'express';
import statisticsController from '../controllers/statistics.controller';
import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verify.admin';

const router = express.Router();

router.get(
	'/month-users',
	verifyToken.headerToken,
	verifyAdmin,
	statisticsController.getMonthlyUsers
);

router.get(
	'/month-enrollments',
	verifyToken.headerToken,
	verifyAdmin,
	statisticsController.getMonthlyEnrollment
);

export default router;
