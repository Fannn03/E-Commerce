import express, { Router } from 'express';
import userRegisterMiddleware from '../middleware/users/user.register.middleware';
import { userRegister } from '../controllers/user.controller';

const router: Router = express.Router();

router.post('/create', userRegisterMiddleware, userRegister);
router.post('/login')

export default router;