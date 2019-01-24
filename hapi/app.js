// app.js
require('env2')(process.env.NODE_ENV == 'production' ? './.env.prod' : './.env.dev');
const Hapi = require('hapi');
const config = require('./config');
const routesHelloHapi = require('./routes/hellow-world');
const shops = require('./routes/shops');
const orders = require('./routes/orders');
const users = require('./routes/users');
// 引入自定义的 hapi-swagger 插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');
const server = new Hapi.Server();
// 配置服务器启动 host 与端口
server.connection({
    port: config.port,
    host: config.host
});

const init = async () => {
    await server.register([
        // 为系统使用 hapi-swagger
        ...pluginHapiSwagger,
        hapiAuthJWT2,
        pluginHapiPagination,
    ]);
    server.route([
        // 创建一个简单的 hello hapi 接口
        ...routesHelloHapi,
        ...orders,
        ...shops,
        ...users,
    ]);
    pluginHapiAuthJWT2(server);
    // 启动服务
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();