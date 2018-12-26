'use strict';

// seeders/xxxxxxxxx-init-goods.js

const timestamps = {
    created_at: new Date(),
    updated_at: new Date(),
};

module.exports = {
    up: queryInterface => queryInterface.bulkInsert(
        'goods',
        [
            { id: 1, name: '商品1', shop_id: 1, thumb_url: '1.png', ...timestamps },
            { id: 2, name: '商品2', shop_id: 2, thumb_url: '2.png', ...timestamps },
            { id: 3, name: '商品3', shop_id: 3, thumb_url: '3.png', ...timestamps },
            { id: 4, name: '商品4', shop_id: 4, thumb_url: '4.png', ...timestamps },
        ], {},
    ),

    down: (queryInterface, Sequelize) => {
        const { Op } = Sequelize;
        // 删除 shop 表 id 为 1，2，3，4 的记录
        return queryInterface.bulkDelete('goods', { id: {
                [Op.lt]: 5 } }, {});
    },
};