const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class careers extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
		}
	}
	careers.init(
		{
			department: DataTypes.STRING,
			jobTitle: DataTypes.STRING,
			location: DataTypes.STRING,
			isOpen: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
			jobLink: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'careers',
		}
	);
	return careers;
};
