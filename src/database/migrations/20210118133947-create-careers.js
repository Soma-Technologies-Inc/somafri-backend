module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('careers', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			department: {
				type: Sequelize.STRING
			},
			jobTitle: {
				type: Sequelize.STRING
			},
			location: {
				type: Sequelize.STRING
			},
			isOpen: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
				allowNull: true
			},
			jobLink: {
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
		await queryInterface.dropTable('careers');
	}
};
