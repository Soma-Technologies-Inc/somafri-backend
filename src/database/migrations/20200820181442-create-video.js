module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('videos', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		title: {
			type: Sequelize.STRING
		},
		videoLink: {
			type: Sequelize.STRING
		},
		languageId: {
			type: Sequelize.INTEGER
		},
		genre: {
			type: Sequelize.STRING
		},
		category: {
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
	}),
	down: (queryInterface, Sequelize) => queryInterface.dropTable('videos')
};
