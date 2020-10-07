const metadata = (Sequelize) => ({
  type: Sequelize.INTEGER,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  allowNull: true,
  defaultValue: null, 
});

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.addColumn('languages', 'duplicatedLanguageId', metadata(Sequelize), { transaction }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.removeColumn('languages', 'duplicatedLanguageId', { transaction }),

  ])),
};
