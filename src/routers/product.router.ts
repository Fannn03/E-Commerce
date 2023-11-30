import express, { Router } from 'express';
import multer from 'multer';
import { multerStorage } from '../config/multer';
import authMiddleware from '../middleware/auth.middleware';
import createProductMiddleware from '../middleware/products/create.product.middleware';

const router: Router = express.Router();
const file = multer({ storage: multerStorage() })

router.post('/create', authMiddleware, file.array('photo'), createProductMiddleware);

export default router;