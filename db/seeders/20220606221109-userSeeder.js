'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Users', [
     {firstName: 'Abe', lastName: 'Lincoln', email: 'honestabe@president.com', password: 'honestabe', createdAt: new Date(),
     updatedAt: new Date(),},
     {firstName: 'Rih', lastName: 'Anna', email: 'rihanna@president.com', password: 'password', createdAt: new Date(),
     updatedAt: new Date(),}
   ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Users', null, {});
  }
};
