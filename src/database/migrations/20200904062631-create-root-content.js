module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('rootContents', {
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
		chapter: {
			type: Sequelize.STRING,
		},
		content: {
			type: Sequelize.TEXT,
		},
		contentImage: {
			type: Sequelize.STRING,
		},
		contentAudio: {
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
	down: (queryInterface, Sequelize) => queryInterface.dropTable('rootContents'),
};
