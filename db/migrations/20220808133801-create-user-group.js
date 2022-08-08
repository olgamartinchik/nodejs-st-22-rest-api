'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserGroups', {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      groupId: {
        type: Sequelize.UUID,
        primaryKey: true,

        onDelete: 'CASCADE',
        references: {
          model: 'Groups',
          key: 'id',
          as: 'groupId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('UserGroups');
  },
};
