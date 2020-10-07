
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    firstName: 'Niyo',
    lastName: 'Eric',
    isVerified: true,
    profileImage: 'https://lh3.googleusercontent.com/a-/AOh14GgBx2XAC5xk_kQIp93fTgi48nMXnA-E3g2FhZL2JUc',
    email: 'niyeric11@gmail.com',
    password: '$2b$10$ZMLImLFaeSO505IECvzlu.vV1SI7gfrvqvayApc1Ecy4YxVM0axRO',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibml5ZXJpYzExQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik5peW9uc2VuZ2EiLCJpc1ZlcmlmaWVkIjpmYWxzZX0sImlhdCI6MTU4OTM0NTQ0OCwiZXhwIjoxNTg5NDMxODQ4fQ.EETUfBirSMfUNKRpdHGn7BDzMIaujvCBGXLBEr8UMPE',
    primaryLanguageId: 2,
    role: 'admin',
    authtype: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('user', null, {}),
};
