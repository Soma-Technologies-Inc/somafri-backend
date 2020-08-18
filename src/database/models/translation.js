'use strict';
module.exports = (sequelize, DataTypes) => {
  const translation = sequelize.define('translation', {
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  translation.associate = function(models) {
    // associations can be defined here
  };
  return translation;
};