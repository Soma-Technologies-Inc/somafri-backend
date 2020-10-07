
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('languages', [
    {
      name: 'English',
      countryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Kinyarwanda',
      countryId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('languages', null, {}),
};
