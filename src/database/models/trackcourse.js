module.exports = (sequelize, DataTypes) => {
	const trackCourses = sequelize.define('trackCourses', {
		userId: DataTypes.INTEGER,
		languageId: DataTypes.INTEGER,
		courseId: DataTypes.INTEGER,
		courseIcon: DataTypes.STRING,
		courseComplexity: DataTypes.INTEGER,
		levelCourses: DataTypes.INTEGER,
		courseName: DataTypes.STRING,
		translatedCourseName: DataTypes.STRING,
		currentChapter: DataTypes.INTEGER,
		totalChapter: DataTypes.INTEGER,
		// testResult: DataTypes.INTEGER,

	}, {});
	trackCourses.associate = function (models) {
		trackCourses.belongsTo(
			models.user,
			{ foreignKey: 'userId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
		trackCourses.belongsTo(
			models.language,
			{ foreignKey: 'languageId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
		trackCourses.belongsTo(
			models.course,
			{ foreignKey: 'courseId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
	};
	return trackCourses;
};
