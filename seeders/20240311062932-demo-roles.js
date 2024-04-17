'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "roles",
        [
          {
            id:uuidv4(),
            name: "superadmin",
            displayName: "Super Admin",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id:uuidv4(),
            name: "admin",
            displayName: "Admin",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id:uuidv4(),
            name: "user",
            displayName: "user",
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
        {}
      );
    } catch (error) {
      console.error("Validation error during migration:", error);
    }

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});

  }
};
