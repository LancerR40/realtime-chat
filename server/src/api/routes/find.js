import express from 'express';
import { findUserController } from '../controllers/find';
import { isAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/:fullname', isAuth, findUserController);

export default router;
