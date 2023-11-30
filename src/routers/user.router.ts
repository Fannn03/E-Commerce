import express, { Router } from 'express';
import userRegisterMiddleware from '../middleware/users/user.register.middleware';
import userLoginMiddleware from '../middleware/users/user.login.middleware';
import { userLogin, userRegister } from '../controllers/user.controller';

const router: Router = express.Router();

router.post('/create', userRegisterMiddleware, userRegister);
router.post('/login', userLoginMiddleware, userLogin);

export default router;