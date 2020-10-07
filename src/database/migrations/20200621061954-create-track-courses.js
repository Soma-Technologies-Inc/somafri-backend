module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('trackCourses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    languageId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'languages',
        key: 'id',
      },
    },
    courseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'courses',
        key: 'id',
      },
    },
    courseIcon: {
      type: Sequelize.STRING,
    },
    courseComplexity: {
      type: Sequelize.INTEGER,
    },
    levelCourses: {
      type: Sequelize.INTEGER,
    },
    courseName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    translatedCourseName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    currentChapter: {
      type: Sequelize.INTEGER,
    },
    totalChapter: {
      type: Sequelize.INTEGER,
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
  down: (queryInterface) => queryInterface.dropTable('trackCourses'),
};
