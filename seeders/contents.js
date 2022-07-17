'use strict';

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'contents',
      [
        {
          value:
            'https://d1zs6vdxfcbd6s.cloudfront.net/marketing/production/assets/img/contentblocks/image2/element4.svg',
          type: 'image',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          value: 'Foleon',
          type: 'title',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    ),
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('contents', {});
  },
};
