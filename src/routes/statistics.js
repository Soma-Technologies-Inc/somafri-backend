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
	'/statistics-dates',
	verifyToken.headerToken,
	verifyAdmin,
	statisticsController.getStatisticsDate
);
router.get(
	'/annual-users/:year',
	verifyToken.headerToken,
	verifyAdmin,
	statisticsController.getAnnualUsers
);

router.get(
	'/years-users',
	verifyToken.headerToken,
	verifyAdmin,
	statisticsController.getYearsUsers
);

router.get(
	'/month-enrollments',
	verifyToken.headerToken,
	verifyAdmin,
	statisticsController.getMonthlyEnrollment
);

router.get(
	'/annual-enrollments/:year',
	verifyToken.headerToken,
	verifyAdmin,
	statisticsController.getAnnualEnrollments
);

export default router;
