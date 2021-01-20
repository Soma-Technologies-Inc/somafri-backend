const metadata = (Sequelize) => ({
	type: Sequelize.INTEGER,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
	allowNull: true,
	references: {
		model: 'languages',
		key: 'id',
	},
	defaultValue: 1,
});

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
		queryInterface.addColumn('users', 'primaryLanguageId', metadata(Sequelize), { transaction }),
	])),

	down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((transaction) => Promise.all([
		queryInterface.removeColumn('users', 'primaryLanguageId', { transaction }),

	])),
};
