import express, { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import createStoreMiddleware from '../middleware/stores/create.store.middleware';
import multer from 'multer';
import { multerStorage } from '../config/multer';

const router: Router = express.Router();
const file = multer({ storage: multerStorage() })

router.post('/create', authMiddleware, file.single('photo'), createStoreMiddleware);

export default router;