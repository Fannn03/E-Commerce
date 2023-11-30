import express, { Router } from 'express';
import multer from 'multer';
import { multerStorage } from '../config/multer';
import authMiddleware from '../middleware/auth.middleware';
import createProductMiddleware from '../middleware/products/create.product.middleware';
import updateProductMiddleware from '../middleware/products/update-product.middleware';
import { createProduct, deleteProduct, detailProduct, findAllProducts, updateProduct } from '../controllers/product.controller';

const router: Router = express.Router();
const file = multer({ storage: multerStorage() });

router.get('/', findAllProducts);
router.post('/create', authMiddleware, file.array('photo'), createProductMiddleware, createProduct);
router.get('/:slug', detailProduct);
router.put('/:id', authMiddleware, updateProductMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;