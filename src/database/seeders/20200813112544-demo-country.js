
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('countries', [
    {
      name: 'USA',
      flag: 'USA',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Rwanda',
      flag: 'Rwanda',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('countries', null, {}),
};
