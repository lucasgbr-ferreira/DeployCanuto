'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('concessionarias', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      nome: { type: Sequelize.STRING, allowNull: false },
      cnpj: { type: Sequelize.STRING, unique: true, allowNull: true },
      telefone: { type: Sequelize.STRING, allowNull: true },
      email_comercial: { type: Sequelize.STRING, allowNull: true },
      endereco: { type: Sequelize.JSONB, allowNull: true },
      dashboard_prefs: { type: Sequelize.JSONB, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('concessionarias');
  }
};

