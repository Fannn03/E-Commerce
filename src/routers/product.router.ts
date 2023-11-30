import express, { Router } from 'express';
import multer from 'multer';
import { multerStorage } from '../config/multer';
import authMiddleware from '../middleware/auth.middleware';
import createProductMiddleware from '../middleware/products/create.product.middleware';
import { createProduct, detailProduct, findAllProducts } from '../controllers/product.controller';

const router: Router = express.Router();
const file = multer({ storage: multerStorage() })

router.get('/', findAllProducts);
router.post('/create', authMiddleware, file.array('photo'), createProductMiddleware, createProduct);
router.get('/:slug', detailProduct);

export default router;