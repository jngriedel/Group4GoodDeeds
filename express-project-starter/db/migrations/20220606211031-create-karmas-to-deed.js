'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('KarmasToDeeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deedId: {
        type: Sequelize.INTEGER,
        references: {model: 'Deeds'}
      },
      karmaId: {
        type: Sequelize.INTEGER,
        references: {model: 'Karmas'}
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('KarmasToDeeds');
  }
};
