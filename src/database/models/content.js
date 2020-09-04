
module.exports = (sequelize, DataTypes) => {
  const content = sequelize.define('content', {
    rootContentId: DataTypes.INTEGER,
    languageId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    contentAudio: DataTypes.STRING,
  }, {});
  content.associate = function (models) {
    content.belongsTo(
      models.rootContent,
      { foreignKey: 'rootContentId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
    content.belongsTo(
      models.language,
      { foreignKey: 'languageId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
  };
  return content;
};
