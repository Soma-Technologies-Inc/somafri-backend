'use strict';
module.exports = (sequelize, DataTypes) => {
  const somaUpdates = sequelize.define('somaUpdates', {
    title: DataTypes.TEXT,
    message: DataTypes.TEXT,
    userEmail: DataTypes.STRING,
  }, {});
  somaUpdates.associate = function(models) {

  };
  return somaUpdates;
};