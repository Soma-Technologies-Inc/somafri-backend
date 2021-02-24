module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('contacts', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		name: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		question: {
			type: Sequelize.STRING,
		},
		description: {
			type: Sequelize.TEXT,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	}),
	down: (queryInterface, Sequelize) => queryInterface.dropTable('contacts'),
};
