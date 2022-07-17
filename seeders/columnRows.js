'use strict';

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'columnRows',
      [
        {
          column_id: 1,
          row_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    ),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('columnRows', {});
  },
};
