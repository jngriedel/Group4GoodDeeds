'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Deeds', [
     {name: 'Donate to Charity',
      description: 'There are many organizations that are currently going underfunded. If you can afford it, providing money to these causes can assist with the challenges that come about when handling the specific issues that the charity can come across. Often times these charities have done the research to know how to spend the money the most effectively.',
      rating: 1,
      createdAt: new Date(),
      updatedAt: new Date(),},
      {name: 'Plant a Tree',
      description: 'Planting a tree is good for the environment. The investment in planting a tree can have its impact felt for many years. Trees work to clean the air everyone breathes and works to keep the environment in better shape.',
      rating: 3,
      createdAt: new Date(),
      updatedAt: new Date(),},
      {name: 'Donate Blood',
      description: 'Donating blood can be really helpful for the community. Hospitals come across the need for blood frequently to help patients in many ways. Patients with tramautic injuries can be in desperate need for the supply of blood contributed to by donating. There are many different blood types therefore many donors are necessary to help those in need.',
      rating: 3,
      createdAt: new Date(),
      updatedAt: new Date(),},
      {name: 'Help a random grandma with her groceries',
      description: 'The elderly often times need assistance with mundane tasks. Helping a grandma with her groceries and taking them to her car can really make their day. These people often times have few people in their lives that can help them with these tasks so the help will always be appreciated.',
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date(),},
      {name: 'Pick up trash',
      description: 'Picking up trash can help everyone. Picking up trash will help the community look better as well as be better for the environment. It can help the local wildlife from running into issues with litter in their habitats. Keeping the community clean benefits everyone!',
      rating: 2,
      createdAt: new Date(),
      updatedAt: new Date(),}
   ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Deeds', null, {});
  }
};
