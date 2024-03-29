module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('audios', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		title: {
			type: Sequelize.STRING
		},
		musicLink: {
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
	down: (queryInterface, Sequelize) => queryInterface.dropTable('audios')
};
