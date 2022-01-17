'use strict';
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataType} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'BlogPosts',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('BlogPosts', 'userId');
  }
};
