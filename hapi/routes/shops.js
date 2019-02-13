const GROUP_NAME = 'shops';
const Joi = require('joi');
const models = require('../models/index');
const { paginationDefine, jwtHeaderDefine } = require('../utils/router-helper');
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
                ...jwtHeaderDefine,
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
                attributes: [
                    'id',
                    'name',
                    'shop_id',
                ]
            });
            console.log('{ results, totalCount }: ', { results, totalCount });

            // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
            reply({ results, totalCount });
        },
        config: {
            auth: false,
            validate: {
                params: {
                    shopId: Joi.string().required(),
                }
            },
            tags: ['api', GROUP_NAME],
            description: '获取店铺的商品列表'
        },
    },
    {
        method: 'POST',
        path: `/${GROUP_NAME}/goods/add`,
        handler: async (request, reply) => {
            // 通过 await 来异步查取数据
            console.log(request)
            const res = await models.goods.bulkCreate([{
                shop_id: request.query.shopId,
                price: request.query.price,
                name: request.query.name,
                thumb_url: request.query.thumb_url,
            }], {
                ignoreDuplicates : true
            });
            console.log('{ results, totalCount }: ', res);

            // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
            reply(res);
        },
        config: {
            auth: false,
            validate: {
                query: {
                    price: Joi.string().required(),
                    name: Joi.string().required(),
                    thumb_url: Joi.string().required(),
                    shopId: Joi.string().required().description('商户Id'),
                },
          
            },
            tags: ['api', GROUP_NAME],
            description: '添加店铺商品'
        },
    }
    
    
]