const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        typeHttp: [
            {module: 'good-squeeze',name:'Squeeze', args: [{error:'*'}]}
        ],
        typeConsole: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*' }]
            },
            {
              module: 'good-console'
            },
            'stdout'
          ],
        typeFile: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ ops: '*' }]
            },
            {
              module: 'good-squeeze',
              name: 'SafeJson'
            },
            {
              module: 'good-file',
              args: ['logs/awesome_log']
            }
          ]
    }
}
module.exports = {
    register: require('good'), 
    options
}