module.exports = (sequelize, DataTypes) => {
	const trackDailyWord = sequelize.define('trackDailyWord', {
		wordId: DataTypes.INTEGER,
		userId: DataTypes.INTEGER,
		read: DataTypes.BOOLEAN
	}, {});
	trackDailyWord.associate = function (models) {
		trackDailyWord.belongsTo(
			models.dailyWord,
			{ foreignKey: 'wordId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
		trackDailyWord.belongsTo(
			models.user,
			{ foreignKey: 'userId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
	};
	return trackDailyWord;
};
