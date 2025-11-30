// server/src/routes/veiculoRoutes.js
import express from 'express';
import {
  createVeiculo,
  getAllVeiculos,
  getVeiculo,
  updateVeiculo,
  deleteVeiculo,
  getCatalogoVeiculos
} from '../controllers/veiculoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

console.log('✅ Rotas de veículo carregadas');

// Middleware: todas as rotas exigem login
router.use(authMiddleware);

// ===============================
// ROTAS DO CATÁLOGO (CLIENTES / CONCESSIONÁRIA / ADMIN)
// ===============================
router.get('/catalogo', getCatalogoVeiculos);

// ===============================
// ROTAS DA CONCESSIONÁRIA
// ===============================
router.post('/', createVeiculo);
router.get('/estoque', getAllVeiculos);

// ===============================
// ROTAS POR ID (sempre por último)
// ===============================
router.get('/:id', getVeiculo);
router.put('/:id', updateVeiculo);
router.delete('/:id', deleteVeiculo);

export default router;
