module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.removeColumn("users", "primaryLanguageId"),
      queryInterface.addColumn("users", "primaryLanguageId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "languages",
          key: "id",
        },
      }),
    ]),

  down: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.removeColumn("users", "primaryLanguageId"),
        queryInterface.addColumn("users", "primaryLanguageId", {
          type: Sequelize.INTEGER,
        }),
    ]),
};
