import express from 'express';
import passport from 'passport';
import userController from '../controllers/users';
import Validate from '../helpers/validate';
import isEmailUsed from '../middlewares/auth';
import isValid from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verify.admin';

import '../config/passport.config';

const router = express.Router();

router.post('/social-signup-mobile', userController.googleAndFacebookMobileSignUp);
router.post('/social-signin-mobile', userController.googleAndFacebookMobileSignIn);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/google', session: false }), userController.authGoogleAndFacebook);
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/redirect', passport.authenticate('facebook', { failureRedirect: '/facebook', session: false }), userController.authGoogleAndFacebook);
router.get('/activate/:autorizations', verifyToken.paramToken, userController.updatedUser);
router.patch('/passWordReset', verifyToken.headerToken, userController.logout);
router.patch('/logout', verifyToken.headerToken, userController.logout);

export default router;
