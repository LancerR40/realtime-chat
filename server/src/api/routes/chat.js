import express from 'express';
import {
  findUsersController,
  sendMsgController,
  chatDataController,
} from '../controllers/chat';
import { isAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/user/:fullname', isAuth, findUsersController);

router.post('/message', isAuth, sendMsgController);

router.get('/', isAuth, chatDataController);

export default router;
