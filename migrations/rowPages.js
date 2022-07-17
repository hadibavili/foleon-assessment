'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'rowPages',
      {
        page_id: {
          allowNull: false,
          type: Sequelize.BIGINT,
        },
        row_id: {
          allowNull: false,
          type: Sequelize.BIGINT,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {},
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rowPages', { cascade: true });
  },
};
