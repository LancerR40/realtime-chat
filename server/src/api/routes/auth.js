import express from 'express';
import { isAuth } from '../middlewares/auth';
import {
  isAuthController,
  signupController,
  loginController,
  logoutController,
} from '../controllers/auth';

const router = express.Router();

router.get('/', isAuthController);

router.post('/signup', signupController);

router.post('/login', loginController);

router.get('/logout', isAuth, logoutController);

export default router;
