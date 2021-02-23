module.exports = (sequelize, DataTypes) => {
	const Contact = sequelize.define('contact', {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		question: DataTypes.STRING,
		description: DataTypes.TEXT,
	}, {});
	Contact.associate = function (models) {
		// associations can be defined here
	};
	return Contact;
};
