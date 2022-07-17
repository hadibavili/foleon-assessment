'use strict';

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'contentColumns',
      [
        {
          column_id: 1,
          content_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    ),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('contentColumns', {});
  },
};
