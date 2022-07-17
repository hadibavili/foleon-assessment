'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'columnRows',
      {
        column_id: {
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
    await queryInterface.dropTable('columnRows', { cascade: true });
  },
};
