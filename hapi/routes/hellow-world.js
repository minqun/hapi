module.exports = [
	{
		method: 'GET',
		path: '/',
		handler: (request, reply) => {
			reply('hapi-test');
        },
        config: {
            tags: ['api','hellow'],
            description: '测试hello -hapi文档',
        }
	}
];
