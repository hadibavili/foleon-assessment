'use strict';

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'columns',
      [
        {
          name: 'first column',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    ),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('columns', {});
  },
};
