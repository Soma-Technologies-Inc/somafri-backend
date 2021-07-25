module.exports = (sequelize, DataTypes) => {
	const country = sequelize.define('subscribe', {
		email: DataTypes.STRING,
		active: {
			type: DataTypes.STRING,
			defaultValue: true,
		},
	}, {});
	return country;
};
