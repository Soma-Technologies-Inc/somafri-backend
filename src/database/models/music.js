'use strict';
module.exports = (sequelize, DataTypes) => {
  const music = sequelize.define('music', {
    title: DataTypes.STRING,
    musicLink: DataTypes.STRING,
    languageId: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  music.associate = function(models) {
    // associations can be defined here
  };
  return music;
};