'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 'c8b66535-0410-4c4d-8dae-267ae1231151',
        login: 'kirill',
        password: '1234qwer',
        age: 10,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
