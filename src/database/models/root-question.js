module.exports = (sequelize, DataTypes) => {
	const rootQuestion = sequelize.define('rootQuestion', {
		rootCourseId: DataTypes.INTEGER,
		firstPart: DataTypes.STRING,
		secondPart: DataTypes.STRING,
	}, {});
	rootQuestion.associate = function (models) {
		rootQuestion.belongsTo(
			models.rootCourse,
			{ foreignKey: 'rootCourseId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
	};
	return rootQuestion;
};
