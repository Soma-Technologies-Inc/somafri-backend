

module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define('course', {
    name: DataTypes.STRING,
    languageId: DataTypes.INTEGER,
    rootCourseId: DataTypes.INTEGER,
  }, {});
  course.associate = function (models) {
    course.belongsTo(
      models.language,
      { foreignKey: 'languageId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
    course.belongsTo(
      models.rootCourse,
      { foreignKey: 'rootCourseId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
  };
  return course;
};
