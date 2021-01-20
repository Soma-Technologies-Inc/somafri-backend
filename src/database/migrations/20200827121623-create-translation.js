module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('translations', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		from: {
			type: Sequelize.STRING
		},
		to: {
			type: Sequelize.STRING
		},
		question: {
			type: Sequelize.STRING
		},
		answer: {
			type: Sequelize.STRING
		},
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			references: {
				model: 'users',
				key: 'id',
			},
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
	down: (queryInterface, Sequelize) => queryInterface.dropTable('translations')
};
