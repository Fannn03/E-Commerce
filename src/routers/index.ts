import express, { Router } from 'express';
import userRouter from './user.router';
import storeRouter from './store.router';

const router: Router = express.Router();

router.use('/users', userRouter);
router.use('/stores', storeRouter);

export default router;