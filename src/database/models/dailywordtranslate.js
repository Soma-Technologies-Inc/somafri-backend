module.exports = (sequelize, DataTypes) => {
	const dailyWordTranslate = sequelize.define('dailyWordTranslate', {
		dailyWordId: DataTypes.INTEGER,
		languageId: DataTypes.INTEGER,
		text: DataTypes.TEXT,
	}, {});
	dailyWordTranslate.associate = function (models) {
		dailyWordTranslate.belongsTo(
			models.dailyWord,
			{ foreignKey: 'dailyWordId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
		dailyWordTranslate.belongsTo(
			models.language,
			{ foreignKey: 'languageId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
	};
	return dailyWordTranslate;
};

