"use strict";
// 创建shop表
module.exports = {
    up: (queryInterface, Sequelize) => {
        // https://itbilu.com/nodejs/npm/VyqgRUVf7.html#queryInterface
        return queryInterface.createTable("shops", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                comment: "店铺ID"
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "店铺名称"
            },
            thumb_url: {
                type: Sequelize.STRING,
                comment: "店铺链接"
            },
            created_at: {
                type: Sequelize.DATE,
                comment: "创建时间"
            },
            updated_at: {
                type: Sequelize.DATE,
                comment: "更新时间"
            }
        });
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("shops");
    }
};