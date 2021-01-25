module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('trackDailyWords', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			wordId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				references: {
					model: 'dailyWords',
					key: 'id',
				}
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				references: {
					model: 'users',
					key: 'id',
				}
			},
			read: {
				type: Sequelize.BOOLEAN
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
	down: async (queryInterface) => {
		await queryInterface.dropTable('trackDailyWords');
	}
};
