import express, { Router } from 'express';
import multer from 'multer';
import { multerStorage } from '../config/multer';
import authMiddleware from '../middleware/auth.middleware';
import createStoreMiddleware from '../middleware/stores/create.store.middleware';
import { createStore } from '../controllers/store.controller';

const router: Router = express.Router();
const file = multer({ storage: multerStorage() })

router.post('/create', authMiddleware, file.single('photo'), createStoreMiddleware, createStore);

export default router;