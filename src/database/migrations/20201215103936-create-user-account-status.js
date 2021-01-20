const metadata = (Sequelize) => ({
	type: Sequelize.BOOLEAN,
	allowNull: false,
	defaultValue: true,
});

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
		queryInterface.addColumn('users', 'status', metadata(Sequelize), { transaction }),
	])),

	down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
		queryInterface.removeColumn('users', 'status', { transaction }),

	])),
};
