
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
    },
    profileImage: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    birthdate: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    primaryLanguageId: {
      type: Sequelize.INTEGER,
    },
    role: {
      type: Sequelize.STRING,
    },
    token: {
      type: Sequelize.STRING(500),
    },
    authtype: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('users'),
};
