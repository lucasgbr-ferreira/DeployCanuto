// server/src/routes/veiculoRoutes.js
import express from 'express';
import {
  createVeiculo,
  getAllVeiculos,
  updateVeiculo,
  deleteVeiculo,
  getCatalogoVeiculos
} from '../controllers/veiculoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// TODAS as rotas abaixo exigem login
router.use(authMiddleware);

// Rotas do painel da concessionária
router.post('/', createVeiculo);
router.get('/estoque', getAllVeiculos);     // ← Estoque privado
router.put('/:id', updateVeiculo);
router.delete('/:id', deleteVeiculo);

// Rota do catálogo (clientes logados também podem acessar)
router.get('/catalogo', getCatalogoVeiculos);   // ← ESSA É A ROTA QUE VOCÊ DEVE USAR

export default router;