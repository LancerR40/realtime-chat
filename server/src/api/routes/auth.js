import express from 'express';
import { signupController, loginController } from '../controllers/auth';

const router = express.Router();

router.post('/signup', signupController);

router.post('/login', loginController);

export default router;
