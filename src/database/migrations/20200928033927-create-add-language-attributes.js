module.exports = {
	up: (queryInterface, Sequelize) => Promise.all([
		queryInterface.addColumn('languages', 'learnable', {
			type: Sequelize.BOOLEAN,
		}),
		queryInterface.addColumn('languages', 'language_key', {
			type: Sequelize.STRING,
		}),
	]),

	down: (queryInterface) => Promise.all([
		queryInterface.removeColumn('languages', 'learnable'),
		queryInterface.removeColumn('languages', 'language_key'),
	]),
};
