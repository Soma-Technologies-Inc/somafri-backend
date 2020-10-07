
module.exports = (sequelize, DataTypes) => {
  const level = sequelize.define('level', {
    name: DataTypes.STRING,
  }, {});
  level.associate = function (models) {

  };
  return level;
};
