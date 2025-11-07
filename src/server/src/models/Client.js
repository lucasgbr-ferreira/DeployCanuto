import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Client = sequelize.define("Client", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
  cpf: { type: DataTypes.STRING, unique: true, allowNull: false },
  endereco: { type: DataTypes.JSONB, allowNull: true },
  telefone: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: "clients",
  timestamps: true,
});

export default Client;
