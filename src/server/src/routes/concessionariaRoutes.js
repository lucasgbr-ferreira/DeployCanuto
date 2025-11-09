import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createConcessionaria, getConcessionaria, updateConcessionaria, deleteConcessionaria } from '../controllers/concessionariaController.js';

const router = express.Router();

router.get('/:id', getConcessionaria); 
router.post('/', authMiddleware, createConcessionaria); 
router.put('/:id', authMiddleware, updateConcessionaria);
router.delete('/:id', authMiddleware, deleteConcessionaria);

export default router;
