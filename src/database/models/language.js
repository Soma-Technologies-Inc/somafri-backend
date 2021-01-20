module.exports = (sequelize, DataTypes) => {
	const language = sequelize.define('language', {
		name: DataTypes.STRING,
		countryId: DataTypes.INTEGER,
		duplicatedLanguageId: DataTypes.INTEGER,
		learnable: DataTypes.BOOLEAN,
		language_key: DataTypes.STRING,
	}, {});
	language.associate = function (models) {
		language.belongsTo(
			models.country,
			{ foreignKey: 'countryId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
	};
	return language;
};
