const metadata = (Sequelize) => ({
  type: Sequelize.TIME,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  allowNull: true,
  defaultValue: null,
});

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.addColumn('audios', 'duration', metadata(Sequelize), { transaction }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
    queryInterface.removeColumn('audios', 'duration', { transaction }),
  ])),
};

