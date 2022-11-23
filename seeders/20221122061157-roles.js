'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        name: 'client',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'freelancer',
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Roles", null, {})
  }
};