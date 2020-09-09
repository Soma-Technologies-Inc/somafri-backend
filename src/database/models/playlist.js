'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      playlist.belongsTo(
        models.audio,
        { foreignKey: 'audioId' },
        { onDelete: 'cascade' },
        { onUpdate: 'cascade' },
      );
    }
  };
  playlist.init({
    audioId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    date: DataTypes.STRING,
    isCompleted: DataTypes.BOOLEAN

  }, {
    sequelize,
    modelName: 'playlist',
  });
  return playlist;
};