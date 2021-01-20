module.exports = (sequelize, DataTypes) => {
	const video = sequelize.define('video', {
		title: DataTypes.STRING,
		videoLink: DataTypes.STRING,
		languageId: DataTypes.INTEGER,
		genre: DataTypes.STRING,
		category: DataTypes.STRING
	}, {});
	video.associate = function (models) {
		// associations can be defined here
	};
	return video;
};
