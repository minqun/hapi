const GROUP_NAME = 'shops';
const Joi = require('joi');
const models = require('../models/index');
const { paginationDefine } = require('../utils/router-helper');
module.exports = [{
        method: 'GET',
        path: `/${GROUP_NAME}`,
        handler: async (request, reply) => {
            // 通过 await 来异步查取数据
            const { rows: results, count: totalCount } = await models.shops.findAndCountAll({
                // attributes: ['id', 'name'],
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit,
            });
            // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
            reply({ results, totalCount });
        },
        config: {
            tags: ['api', GROUP_NAME],
            description: '获取店铺列表',
            auth: false,
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
                query: {
                    ...paginationDefine
                }
            }
        }
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/{shopId}/goods`,
        handler: async (request, reply) => {
            // 通过 await 来异步查取数据
            const { rows: results, count: totalCount } = await models.goods.findAndCountAll({
                // 基于 shop_id 的条件查询
                where: {
                    shop_id: request.params.shopId,
                },
            });
            // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
            reply({ results, totalCount });
        },
        config: {
            validate: {
                params: {
                    shopId: Joi.string().required(),
                }
            },
            tags: ['api', GROUP_NAME],
            description: '获取店铺的商品列表'
        },
    }
]