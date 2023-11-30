import express, { Router } from 'express';
import userRouter from './user.router';
import storeRouter from './store.router';
import productRouter from './product.router';

const router: Router = express.Router();

router.use('/users', userRouter);
router.use('/stores', storeRouter);
router.use('/products', productRouter);

export default router;