const { jwtHeaderDefine } = require('../utils/router-helper');
module.exports = [
	{
		method: 'GET',
		path: '/',
		handler: (request, reply) => {
            console.log(request.auth.credentials); // 控制台输出 { userId: 1}
            console.log(request); // 控制台输出 { userId: 1}
			reply('hapi-test');
        },
        config: {
            validate: {
                ...jwtHeaderDefine,
            },
            tags: ['api','hellow'],
            description: '测试hello -hapi文档',
        }
	}
];
