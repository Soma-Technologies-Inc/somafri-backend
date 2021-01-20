module.exports = (sequelize, DataTypes) => {
	const learning = sequelize.define('learning', {
		userId: DataTypes.INTEGER,
		languageId: DataTypes.INTEGER,
		totalLevel: DataTypes.INTEGER,
		currentLevel: DataTypes.INTEGER,
		currentCourseId: DataTypes.INTEGER,
		currentCourseName: DataTypes.STRING,
		countryFlag: DataTypes.STRING,
	}, {});
	learning.associate = function (models) {
		learning.belongsTo(
			models.user,
			{ foreignKey: 'userId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
		learning.belongsTo(
			models.language,
			{ foreignKey: 'languageId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
		learning.belongsTo(
			models.level,
			{ foreignKey: 'currentLevel' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
		learning.belongsTo(
			models.course,
			{ foreignKey: 'currentCourseId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
	};
	return learning;
};
