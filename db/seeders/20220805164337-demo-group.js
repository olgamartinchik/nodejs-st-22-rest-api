'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Groups', [
      {
        id: 'c8b66457-1234-4c4d-8dae-267ae1232346',
        name: 'user',
        permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Groups', null, {});
  },
};
