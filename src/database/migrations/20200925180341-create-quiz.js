module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('quizzes', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		contentId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			references: {
				model: 'contents',
				key: 'id',
			},
		},
		quizContent: {
			type: Sequelize.TEXT,
		},
		quizAudio: {
			type: Sequelize.STRING,
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
	down: (queryInterface, Sequelize) => queryInterface.dropTable('quizzes'),
};
