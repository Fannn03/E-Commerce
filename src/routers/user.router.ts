import express, { Router } from 'express';
import userCreateMiddleware from '../middleware/users/user.create.middleware';
import { userRegister } from '../controllers/user.controller';

const router: Router = express.Router();

router.post('/create', userCreateMiddleware, userRegister);

export default router;