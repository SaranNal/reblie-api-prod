'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const role = await queryInterface.rawSelect('roles', {
        where: {
          name: 'superadmin',
        },
      }, ['id']);
      const salt = await bcrypt.genSalt(10);
      const encryptPassword = await bcrypt.hash("admin@123", salt);
      await queryInterface.bulkInsert(
        "users",
        [
          {
            id:uuidv4(),
            firstName: "super",
            lastName: "admin",
            roleId:role,
            email: "superadmin@reblie.com",
            password: encryptPassword,
            source: "Others",
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ],
        {}
      );
    } catch (error) {
      console.error("Validation error during migration:", error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
