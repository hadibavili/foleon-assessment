'use strict';

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'rowPages',
      [
        {
          row_id: 1,
          page_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    ),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('rowPages', {});
  },
};
