'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                comment: '用户ID',
            },
            nick_name: { type: Sequelize.STRING, comment: '用户昵称', },
            avatar_url: { type: Sequelize.STRING, comment: '头像', },
            gender: { type: Sequelize.INTEGER, comment: '性别', },
            open_id: { type: Sequelize.STRING, comment: '用户openId', },
            session_key: { type: Sequelize.STRING, comment: '用户session_key', },
            created_at: { type: Sequelize.DATE, comment: '创建时间', },
            updated_at: { type: Sequelize.DATE, comment: '更新时间', },
        })
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users')
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};