import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Veiculo = sequelize.define('Veiculo', {
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
  },
  imagemUrl: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
});

export default Veiculo;