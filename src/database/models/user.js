module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define(
		'user',
		{
			firstName: { type: DataTypes.STRING, allowNull: false },
			lastName: { type: DataTypes.STRING, allowNull: false },
			isVerified: { type: DataTypes.BOOLEAN, allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false },
			password: { type: DataTypes.STRING, allowNull: true },
			profileImage: { type: DataTypes.STRING, allowNull: true },
			gender: { type: DataTypes.STRING, allowNull: true },
			country: { type: DataTypes.STRING, allowNull: true },
			birthdate: { type: DataTypes.STRING, allowNull: true },
			primaryLanguageId: { type: DataTypes.INTEGER, allowNull: true, },
			role: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: 'standard',
			},
			token: { type: DataTypes.STRING(500), allowNull: true },
			authtype: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			status: { type: DataTypes.BOOLEAN, allowNull: true, },
			type: { type: DataTypes.STRING, allowNull: true },
		},
		{},
	);
	user.associate = function (models) {
		user.belongsTo(
			models.language,
			{ foreignKey: 'primaryLanguageId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
	};
	return user;
};
