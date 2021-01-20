module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('somaUpdates', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.TEXT
			},
			message: {
				type: Sequelize.TEXT
			},
			userEmail: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('somaUpdates');
	}
};
