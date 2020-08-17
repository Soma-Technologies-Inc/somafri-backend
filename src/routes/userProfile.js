import express from 'express';
import userController from '../controllers/users';
import verifyToken from '../middlewares/verifyToken';
import '../config/passport.config';

const router = express.Router();
router.patch('/edit-profile', verifyToken.headerToken, userController.editUserProfile);

export default router;
