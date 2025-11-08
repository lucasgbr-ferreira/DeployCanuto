// server/src/controllers/veiculoController.js
import { Veiculo } from '../models/index.js';

// --- CREATE (Já existente, mas atualizado) ---
export const createVeiculo = async (req, res) => {
  try {
    // Agora o req.body também pode conter 'imagemUrl'
    const dadosVeiculo = req.body;
    const novoVeiculo = await Veiculo.create(dadosVeiculo); 
    res.status(201).json(novoVeiculo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar veículo', error: error.message });
  }
};

// --- READ (NOVO) ---
export const getAllVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll();
    res.status(200).json(veiculos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar veículos', error: error.message });
  }
};

// --- UPDATE (NOVO) ---
export const updateVeiculo = async (req, res) => {
  try {
    const { id } = req.params; // Pega o ID da URL (ex: /api/veiculos/12)
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    // Atualiza o veículo com os novos dados do req.body
    await veiculo.update(req.body);
    
    res.status(200).json(veiculo); 
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar veículo', error: error.message });
  }
};

// --- DELETE ---
export const deleteVeiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    await veiculo.destroy();
    
    res.status(204).json({ message: 'Veículo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar veículo', error: error.message });
  }
};