import express, { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/create', authMiddleware);

export default router;