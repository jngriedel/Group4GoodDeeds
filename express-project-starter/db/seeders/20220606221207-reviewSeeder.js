'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Reviews', [
     {title: 'RESEARCH the charity',
      body: 'After donating I did more research on the charity I donated to and realized they were using the money to just line their own pockets.',
      rating: 1,
      userId: 2,
      deedId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),},
      {title: 'Tree takes a long time to grow',
      body: 'Tree looks good but take a long time to see the results. Some trees planted did not make it.',
      rating: 3,
      userId: 1,
      deedId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),},
      {title: 'Felt good to donate but passed out during donation',
      body: 'Donated blood to the Red Cross however I fainted soon after. Luckily the workers there provided good care of me until I was able to get back on my feet.',
      rating: 3,
      userId: 2,
      deedId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),},
      {title: 'Grandma was very appreciative',
      body: 'Highly recommend it. The grandma was very happy I took the time to help.',
      rating: 5,
      userId: 1,
      deedId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),},
      {title: 'The trash stinks',
      body: 'Tried to pick up the trash but it stunk couldnt go longer than 10 minutes picking up trash around the park',
      rating: 2,
      userId: 1,
      deedId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),},
   ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
