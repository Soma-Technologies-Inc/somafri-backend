import express from 'express';
import isValid from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import Validate from '../helpers/validate';
import ContactController from '../controllers/contact';
import verifyAdmin from '../middlewares/verify.admin';

const router = express.Router();

router.post('/', [Validate.contact(), isValid, ContactController.contactUs]);
router.get('/messages', [
	verifyToken.headerToken, verifyAdmin,
	ContactController.getMessages,
]);

export default router;
