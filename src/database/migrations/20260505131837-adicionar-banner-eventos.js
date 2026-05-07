'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('eventos', 'banner', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'capacidade',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('eventos', 'banner');
  },
};
