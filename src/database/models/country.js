module.exports = (sequelize, DataTypes) => {
	const country = sequelize.define('country', {
		name: DataTypes.STRING,
		flag: DataTypes.STRING
	}, {});
	country.associate = function (models) {

	};
	return country;
};
