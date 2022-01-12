'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Category = await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id',
        }
      },
    })
    return Category;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('BlogPosts');
  },
};
