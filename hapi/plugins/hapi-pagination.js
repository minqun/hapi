const hapiPagination = require('hapi-pagination');
const options = {
    query: {
        // ... 此处篇幅考虑省略 query 配置代码，
        page: {
            name: 'page',
            default: 1
        },
        limit: {
            name: 'limit',
            default: 10
        },
        pagination: {
            name: 'pagination',
			default: true
		},
        invalid: 'defaults'
    },
    meta: {
        name: 'pagination',
        count: {
            active: true,
            name: 'count'
        },
        totalCount: {
            active: true,
            name: 'totalCount'
        },
        pageCount: {
            active: true,
            name: 'pageCount'
        },
        self: {
            active: true,
            name: 'self'
        },
        previous: {
            active: true,
            name: 'previous'
        },
        next: {
            active: true,
            name: 'next'
        },
        first: {
            active: true,
            name: 'first'
        },
        last: {
            active: true,
            name: 'last'
        },
        page: {
            active: false,
            // name == default.query.page.name
        },
        limit: {
            active: false
            // name == default.query.limit.name
        }
        // ... 省略 meta 的相关配置代码，
    },
    results: {
        name: 'results'
    },
    reply: {
        paginate: 'paginate'
    },
    routes: {
        include: [
            '/shops' // 店铺列表支持分页特性
        ],
        exclude: []
    }
}
module.exports = {
    register: hapiPagination,
    options: options,
  }