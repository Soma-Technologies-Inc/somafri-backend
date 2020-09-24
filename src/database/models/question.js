
module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    languageId: DataTypes.INTEGER,
    rootQuestionId: DataTypes.INTEGER,
    firstPart: DataTypes.STRING,
    secondPart: DataTypes.STRING,
  }, {});
  question.associate = function (models) {
    question.belongsTo(
      models.language,
      { foreignKey: 'languageId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
    question.belongsTo(
      models.rootQuestion,
      { foreignKey: 'rootQuestionId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
  };
  return question;
};
