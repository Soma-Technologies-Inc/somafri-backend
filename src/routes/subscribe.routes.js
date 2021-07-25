import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import SubscribeController from '../controllers/subscribe.controller';
import verifyAdmin from '../middlewares/verify.admin';
import Validate from '../helpers/validate';
import isValid from '../middlewares/validate';

const router = express.Router();

router.post('/', Validate.userEmail(), isValid, SubscribeController.subscribe);
router.get('/', verifyToken.headerToken, verifyAdmin, SubscribeController.getSubscribes);
router.get('/all', verifyToken.headerToken, verifyAdmin, SubscribeController.subscribeAllUsers);

export default router;
