module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Surveys", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },
      dailyGoal: {
        type: Sequelize.STRING,
      },
      whereUserHeardUs: {
        type: Sequelize.STRING,
      },
      purposeOfLearning: {
        type: Sequelize.STRING,
      },
      submitted: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Surveys");
  },
};
