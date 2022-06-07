'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Statuses', [
    {currentStatus: 'Not Interested'},
    {currentStatus: 'In-Progress'},
    {currentStatus: 'Completed'},
   ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Statuses', null, {});
  }
};
