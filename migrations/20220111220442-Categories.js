'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Category = await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

    })
    return Category;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('Categories');
  },
};
