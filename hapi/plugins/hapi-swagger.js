//如果要查看API中的文档，还需要安装支持模板和静态内容服务的惰性和视觉插件
const inert = require('inert');
const vision = require('vision');

const hapiSwagger = require('hapi-swagger');
const Pack = require('package');

module.exports = [
	inert,
	vision,
	{
		register: hapiSwagger,
		options: {
			info: {
				title: '接口文档',
				version: Pack.version
			},
			// 定义接口以 tags 属性定义为分组
			grouping: 'tags',
			tags: [ { name: 'tests', description: '' } ]
		}
	}
];
