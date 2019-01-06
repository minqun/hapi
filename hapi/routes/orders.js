const GROUP_NAME = 'orders';
const Joi = require('joi');
const xml2js = require('xml2js');
const config = require('../config');
const axios = require('axios');
const {
    jwtHeaderDefine
} = require('../utils/router-helper');
const models = require('../models/index');
module.exports = [{
        method: 'POST',
        path: `/${GROUP_NAME}`,
        handler: async (request, reply) => {
            await models.sequelize.transaction((t) => {
                const result = models.orders.create({
                    user_id: request.auth.credentials.userId,
                }, {
                    transaction: t
                }).then((order) => {
                    const goodsList = [];
                    request.payload.goodsList.forEach(async (item) => {
                        const goods = await models.goods.findOne({where:{id: item.goods_id}});
                        console.log(goods);
                        goodsList.push(models.order_goods.create({
                            order_id: order.dataValues.id,
                            goods_id: item.goods_id,
                            single_price: goods.price,
                            count: item.count
                        }));
                    })
                    
                    return Promise.all(goodsList)
                });
                return result;
            }).then(() => {
                reply('success')
            }).catch(() => {
                reply('error');
            });
        },

        config: {
            validate: {
                payload: {
                    goodsList: Joi.array().items(
                        Joi.object().keys({
                            goods_id: Joi.number().integer(),
                            count: Joi.number().integer()
                        })
                    )
                },
                ...jwtHeaderDefine
            },
            tags: ['api', GROUP_NAME],
            description: '创建订单'
        },
    },
    {
        method: 'POST',
        path: `/${GROUP_NAME}/{orderId}/pay`,
        handler: async (request, reply) => {
            const user =  await models.users.findOne({where: {id:request.auth.credentials.userId}}) 
            const { open_id } = user;
            console.log(request, 'request')
            // 构造 unifiedorder 所需入参
            const unifiedorderObj = {
                appid: config.wxAppid, // 小程序 id
                body: '小程序支付', // 商品简单描述
                mch_id: config.wxMchid, // 商户号
                nonce_str: Math.random().toString(36).substr(2, 15), // 随机字符串
                notify_url: config.wxRollback, // 支付成功的回调地址
                openid: open_id, // 用户 openid
                out_trade_no: request.params.orderId, // 商户订单号
                spbill_create_ip: request.info.remoteAddress, // 调用支付接口的用户 ip
                total_fee: 222, // 总金额，单位为分
                trade_type: 'JSAPI', // 交易类型，默认
            };
            // 签名的数据
            const getSignData = (rawData,apiKey) => {
                let keys = Object.keys(rawData);
                console.log(keys);
                keys = keys.sort();
                let string = '';
                keys.forEach(key => {
                    string += `&${key}=${rawData}`;
                } )
                string = string.substr(1);
                return crypto.createHash('md5').update(`${string}&key=${apiKey}`).digest('hex').toUpperCase();
            };
            // 将基础数据信息 sign 签名
            const sign = getSignData(unifiedorderObj, config.wxPayApiKey);
            // 需要被 post 的数据源
            const unifiedorderWithSign = {
                ...unifiedorderObj,
                sign,
              };
            // 将需要 post 出去的订单参数，转换位 xml 格式
            const builder = new xml2js.Builder({ rootName: 'xml', headless: true });
            const unifiedorderXML=builder.buildObject(unifiedorderWithSign);
            const result = await axios({
                url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
                method: 'POST',
                data:unifiedorderXML,
                header: {'content-type':'text/xml'} 
            })
            // result 是一个 xml 结构的 response，转换为 jsonObject，并返回前端
            xml2js.parseString(result.data, (err,parsedResult)=> {
                if (parsedResult.xml) {
                    if (parsedResult.xml.return_code[0] == 'SUCCESS' && parsedResult.xml.result_code[0] === 'SUCCESS') {
                        // 待签名的原始支付数据
                        const replyData = {
                            appId: parsedResult.xml.appid[0],
                            timeStamp: (Date.now() / 1000).toString(),
                            nonceStr: parsedResult.xml.nonce_str[0],
                            package: `prepay_id=${parsedResult.xml.prepay_id[0]}`,
                            signType: 'MD5',
                          };
                          replyData.paySign = getSignData(replyData, config.wxPayApiKey);
                          reply(replyData);
                    }
                }
            })
            
        },
        config: {
            validate: {
                params: {
                    orderId: Joi.string().required(),
                },
                ...jwtHeaderDefine,
            },
            tags: ['api', GROUP_NAME],
            description: '支付某条订单'
        },
    },
    {
        method: 'POST',
        path: `/${GROUP_NAME}/pay/notify`,
        handler: async (request, reply) => {
          xml2js.parseString(request.payload, async (err, parsedResult) => {
            if (parsedResult.xml.return_code[0] === 'SUCCESS') {
              // 微信统一支付状态成功，需要检验本地数据的逻辑一致性
              // 省略...细节逻辑校验
              // 更新该订单编号下的支付状态未已支付
              const orderId = parsedResult.xml.out_trade_no[0];
              const orderResult = await models.orders.findOne({ where: { id: orderId } });
              orderResult.payment_status = '1';
              await orderResult.save();
              // 返回微信，校验成功
              const retVal = {
                return_code: 'SUCCESS',
                return_msg: 'OK',
              };
              const builder = new xml2js.Builder({
                rootName: 'xml',
                headless: true,
              });
              reply(builder.buildObject(retVal));
            }
          });
        },
        config: {
          tags: ['api', GROUP_NAME],
          description: '微信支付成功的消息推送',
          auth: false,
        },
      },
      
]