const metadata = (Sequelize) => ({
	type: Sequelize.STRING,
	allowNull: true,
});

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(
		(transaction) => Promise.all([
			queryInterface.addColumn('users', 'type', metadata(Sequelize), { transaction }),
		])),

	down: (queryInterface) => queryInterface.sequelize.transaction(
		(transaction) => Promise.all([
			queryInterface.removeColumn('users', 'type', { transaction }),

		])),
};
