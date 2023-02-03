'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companyPerformaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sector: {
        type: Sequelize.STRING
      },
      companyId: {
        type: Sequelize.STRING
      },
      cpi: {
        type: Sequelize.FLOAT
      },
      cf: {
        type: Sequelize.FLOAT
      },
      mau: {
        type: Sequelize.FLOAT
      },
      roic: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companyPerformaces');
  }
};