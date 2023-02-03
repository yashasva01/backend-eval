'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companyScores', {
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
      ceoName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.FLOAT
      },
      name: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('companyScores');
  }
};