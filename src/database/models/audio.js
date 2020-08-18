'use strict';
module.exports = (sequelize, DataTypes) => {
  const audio = sequelize.define('audio', {
    title: DataTypes.STRING,
    musicLink: DataTypes.STRING,
    languageId: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  audio.associate = function(models) {
    // associations can be defined here
  };
  return audio;
};