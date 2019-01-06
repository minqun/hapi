'use strict';
// 创建good表
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('goods', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                comment: '商品ID',
                primaryKey: true,
            },
            shop_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: '店铺ID',
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: '商品名称',
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
                comment: '商品价格',
            },
            thumb_url: {
                type: Sequelize.STRING,
                comment: '商品链接',
            },
            created_at: {
                type: Sequelize.DATE,
                comment: '创建时间',
            },
            updated_at: {
                type: Sequelize.DATE,
                comment: '更新时间',
            }
        })
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('goods');
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};