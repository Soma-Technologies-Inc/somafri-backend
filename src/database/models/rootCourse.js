

module.exports = (sequelize, DataTypes) => {
  const rootCourse = sequelize.define(
    'rootCourse',
    {
      name: DataTypes.STRING,
      languageId: DataTypes.INTEGER,
      levelId: DataTypes.INTEGER,
      complexity: DataTypes.INTEGER,
      courseIcon: DataTypes.STRING,
    },
    {},
  );
  rootCourse.associate = function (models) {
    rootCourse.belongsTo(
      models.language,
      { foreignKey: 'languageId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
    rootCourse.belongsTo(
      models.level,
      { foreignKey: 'levelId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
  };
  return rootCourse;
};
