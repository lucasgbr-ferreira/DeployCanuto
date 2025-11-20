// server/src/controllers/veiculoController.js
import { Veiculo } from '../models/index.js';
import { Concessionaria } from '../models/index.js';

// ========================================
// CRUD PRIVADO – SOMENTE CONCESSIONÁRIA
// ========================================

export const createVeiculo = async (req, res) => {
  if (req.user.role !== 'concessionaria') {
    return res.status(403).json({ message: 'Acesso negado: Apenas concessionárias' });
  }

  try {
    const dados = req.body;

    if (!dados.placa || !dados.modelo || !dados.marca) {
      return res.status(400).json({ message: 'Placa, modelo e marca são obrigatórios' });
    }

    dados.placa = dados.placa.toUpperCase().replace(/\s/g, '');

    const dadosProcessados = {
      ...dados,
      ano: dados.ano ? parseInt(dados.ano) : null,
      preco: dados.preco ? parseFloat(dados.preco) : null,
      quilometragem: dados.quilometragem ? parseInt(dados.quilometragem) : null,
      concessionaria_id: req.user.concessionaria_id,
    };

    const novoVeiculo = await Veiculo.create(dadosProcessados);
    res.status(201).json(novoVeiculo);
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(e => e.message);
      return res.status(400).json({ message: 'Erro de validação', errors });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Placa já cadastrada no sistema' });
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getAllVeiculos = async (req, res) => {
  if (req.user.role !== 'concessionaria') {
    return res.status(403).json({ message: 'Acesso negado: Apenas concessionárias' });
  }

  try {
    const veiculos = await Veiculo.findAll({
      where: { concessionaria_id: req.user.concessionaria_id },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(veiculos);
  } catch (error) {
    console.error('Erro ao buscar estoque:', error);
    res.status(500).json({ message: 'Erro ao carregar estoque' });
  }
};

export const updateVeiculo = async (req, res) => {
  if (req.user.role !== 'concessionaria') {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (!veiculo || veiculo.concessionaria_id !== req.user.concessionaria_id) {
      return res.status(403).json({ message: 'Veículo não pertence à sua concessionária' });
    }

    if (req.body.placa) {
      req.body.placa = req.body.placa.toUpperCase().replace(/\s/g, '');
    }

    const dados = {
      ...req.body,
      ano: req.body.ano ? parseInt(req.body.ano) : undefined,
      preco: req.body.preco ? parseFloat(req.body.preco) : undefined,
      quilometragem: req.body.quilometragem ? parseInt(req.body.quilometragem) : undefined,
    };

    await veiculo.update(dados);
    res.status(200).json(veiculo);
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Placa já cadastrada' });
    }
    res.status(500).json({ message: 'Erro ao atualizar veículo' });
  }
};

export const deleteVeiculo = async (req, res) => {
  if (req.user.role !== 'concessionaria') {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (!veiculo || veiculo.concessionaria_id !== req.user.concessionaria_id) {
      return res.status(403).json({ message: 'Veículo não encontrado' });
    }

    await veiculo.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar veículo' });
  }
};

// ========================================
// CATÁLOGO – ACESSÍVEL POR CLIENTES LOGADOS
// ========================================
export const getCatalogoVeiculos = async (req, res) => {
  // Permite cliente ou concessionária logada
  if (!['client', 'concessionaria', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Acesso negado. Verifique suas permissões.' });
  }

  try {
    const veiculos = await Veiculo.findAll({
      where: {
        status: 'Disponível'
      },
      include: [
        {
          model: Concessionaria,
          as: 'concessionaria',
          attributes: ['nome', 'telefone', 'email_comercial', 'endereco'],
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(veiculos);
  } catch (error) {
    console.error('Erro ao carregar catálogo:', error);
    res.status(500).json({ message: 'Erro ao carregar catálogo' });
  }
};