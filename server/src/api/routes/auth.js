import express from 'express';
import {
  isAuthController,
  signupController,
  loginController,
} from '../controllers/auth';

const router = express.Router();

router.get('/', isAuthController);

router.post('/signup', signupController);

router.post('/login', loginController);

// router.get('/logout', isAuth, logoutController);

export default router;
