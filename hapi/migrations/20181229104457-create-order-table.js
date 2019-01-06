'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('orders', {
          id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
          },
          user_id: {
              type: Sequelize.INTEGER,
              allowNull: false,
          },
          payment_status: {
              type: Sequelize.ENUM('0', '1'), // 0 未支付， 1已支付
              defaultValue: '0'
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
      })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('orders');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
