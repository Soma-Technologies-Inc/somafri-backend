const metadata = (Sequelize) => ({
  type: Sequelize.BOOLEAN,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  allowNull: true,
  defaultValue: null,
});

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.addColumn('users', 'isGuest', metadata(Sequelize), { transaction }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.removeColumn('users', 'isGuest', { transaction }),

  ])),
};