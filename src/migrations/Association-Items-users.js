'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Users', {
      fields: ['roleId'],
      type: "foreign key",
      name: "role_user_association",
      references: {
        table: 'Roles',
        field: 'roleId'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Users', 'role_user_association')
  }
};