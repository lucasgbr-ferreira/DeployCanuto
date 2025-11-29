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

// TODAS as rotas abaixo exigem login
router.use(authMiddleware);

// ===============================
// ROTA DO CATÁLOGO – TEM QUE VIR PRIMEIRO
// ===============================
router.get('/catalogo', getCatalogoVeiculos);

// ===============================
// ROTAS DO PAINEL DA CONCESSIONÁRIA
// ===============================
router.post('/', createVeiculo);
router.get('/estoque', getAllVeiculos);

// ===============================
// ROTAS DINÂMICAS — SEMPRE VÃO POR ÚLTIMO
// ===============================
router.get('/:id', getVeiculo);
router.put('/:id', updateVeiculo);
router.delete('/:id', deleteVeiculo);

export default router;
