module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('rootQuestions', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		rootCourseId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			references: {
				model: 'rootCourses',
				key: 'id',
			},
		},
		firstPart: {
			type: Sequelize.STRING,
		},
		secondPart: {
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
	down: (queryInterface, Sequelize) => queryInterface.dropTable('rootQuestions'),
};
