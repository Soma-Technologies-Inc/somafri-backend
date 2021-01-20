module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.bulkInsert('levels', [
		{
			name: 'beginner',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: 'middle',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			name: 'advanced',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]),

	down: (queryInterface, Sequelize) => queryInterface.bulkDelete('levels', null, {}),
};
