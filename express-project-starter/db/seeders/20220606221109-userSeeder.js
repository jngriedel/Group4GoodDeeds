'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Users', [
     {firstName: 'Abe', lastName: 'Lincoln', email: 'honestabe@president.com', password: 'honestabe', createdAt: new Date(),
     updatedAt: new Date(),},
     {firstName: 'Rih', lastName: 'Anna', email: 'rihanna@president.com', password: 'password', createdAt: new Date(),
     updatedAt: new Date(),},
     {firstName: 'Gallant', lastName: 'Grant', email: 'mrgoodguy@gmail.com', password: '$2a$10$SOzlKv/wx6v3w8AydCqzE./Hllo5wbkB5/ykJfgf1lv8Ox.zdeObW', createdAt: new Date(),
     updatedAt: new Date(),}
   ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Users', null, {});
  }
};
