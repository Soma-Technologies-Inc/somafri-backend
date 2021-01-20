module.exports = (sequelize, DataTypes) => {
	const quiz = sequelize.define(
		'quiz',
		{
			contentId: DataTypes.INTEGER,
			quizContent: DataTypes.TEXT,
			quizAudio: DataTypes.STRING,
		},
		{},
	);
	quiz.associate = function (models) {
		quiz.belongsTo(
			models.content,
			{ foreignKey: 'contentId' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' },
		);
	};
	return quiz;
};
