'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize'); // ORM
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configs = require(__dirname + '/../config/config.js');
const db = {};
const config = {
    ...configs[env],
    define: {
        underscored: true,
    },
};
let sequelize;
// 建立连接
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
console.log(sequelize, 'process');
//指定目录下所有文件名称”的数组对象 : fs.readdirSync
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
console.log(db.Sequelize, 'process-db');
module.exports = db;