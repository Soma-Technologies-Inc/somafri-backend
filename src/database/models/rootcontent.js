
module.exports = (sequelize, DataTypes) => {
  const rootContent = sequelize.define(
    'rootContent',
    {
      rootCourseId: DataTypes.INTEGER,
      chapter: DataTypes.STRING,
      content: DataTypes.TEXT,
      contentImage: DataTypes.STRING,
      contentAudio: DataTypes.STRING,
    },
    {},
  );
  rootContent.associate = function (models) {
    rootContent.belongsTo(
      models.rootCourse,
      { foreignKey: 'rootCourseId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
  };
  return rootContent;
};
