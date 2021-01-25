import express from 'express';
import isValid from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import Validate from '../helpers/validate';
import DailyWordController from '../controllers/dailyWord';
import verifyAdmin from '../middlewares/verify.admin';

const router = express.Router();

router.post('/', verifyToken.headerToken, verifyAdmin, [
	Validate.dailyWord(),
	isValid,
	DailyWordController.addDailyWord,
]);
router.get('/unread', verifyToken.headerToken, [
	DailyWordController.getUnreadDailyWord,
]);

router.post('/today', verifyToken.headerToken, [
	Validate.getDailyWord(),
	isValid,
	DailyWordController.getDailyWord,
]);
export default router;
