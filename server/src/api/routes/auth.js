import express from 'express';
import {
  authVerifyController,
  signupController,
  loginController,
  logoutController,
} from '../controllers/auth';

const router = express.Router();

router.get('/', authVerifyController);

router.post('/signup', signupController);

router.post('/login', loginController);

router.get('/logout', logoutController);

export default router;
