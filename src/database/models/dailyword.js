module.exports = (sequelize, DataTypes) => {
	const dailyWord = sequelize.define('dailyWord', {
		text: DataTypes.STRING
	}, {});
	dailyWord.associate = function (models) {
	};
	return dailyWord;
};
