
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('languages', [
    {
      name: 'Kinyarwanda',
      countryId: 2,
      language_key: 'rw',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'English',
      countryId: 1,
      language_key: 'en',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('languages', null, {}),
};
