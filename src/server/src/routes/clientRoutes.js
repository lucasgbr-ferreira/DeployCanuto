import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getClientProfile, updateClient } from '../controllers/clientController.js';

const router = express.Router();

router.get('/me', authMiddleware, getClientProfile);
router.get('/:id', authMiddleware, getClientProfile);
router.put('/me', authMiddleware, updateClient);

export default router;
