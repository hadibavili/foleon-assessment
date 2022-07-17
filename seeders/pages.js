'use strict';

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'pages',
      [
        {
          name: 'first page',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    ),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('pages', {});
  },
};
