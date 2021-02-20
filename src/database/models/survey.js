const {
	Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Survey extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			Survey.belongsTo(
				models.user,
				{ foreignKey: 'userId' },
				{ onDelete: 'cascade' },
				{ onUpdate: 'cascade' }
			);
		}
	}
	Survey.init(
		{
			userId: DataTypes.INTEGER,
			dailyGoal: DataTypes.STRING,
			whereUserHeardUs: DataTypes.STRING,
			purposeOfLearning: DataTypes.STRING,
			submitted: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
		},
		{
			sequelize,
			modelName: 'Survey',
		}
	);
	return Survey;
};
