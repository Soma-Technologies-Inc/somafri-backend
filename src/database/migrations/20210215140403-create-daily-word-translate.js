module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('dailyWordTranslates', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			dailyWordId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				references: {
					model: 'dailyWords',
					key: 'id',
				},
			},
			languageId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				references: {
					model: 'languages',
					key: 'id',
				},
			},
			text: {
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
		await queryInterface.dropTable('dailyWordTranslates');
	}
};
