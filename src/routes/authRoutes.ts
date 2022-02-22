import { Router } from 'express';
import { getLoginPage, postLoginPage, postLogoutPage, getSignupPage, postSignupPage } from '../controllers/authController';

const router = Router();

router.get('/login', getLoginPage);
router.post('/login', postLoginPage);
router.post('/logout', postLogoutPage);
router.get('/signup', getSignupPage);
router.post('/signup', postSignupPage);

export default router;
