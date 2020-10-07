
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('contactUs', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
  }, {});
  Contact.associate = function (models) {
    // associations can be defined here
  };
  return Contact;
};
