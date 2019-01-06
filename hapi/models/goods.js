// model/goods.js
module.exports = (sequelize, DataTypes) => sequelize.define(
    'goods', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        shop_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumb_url: DataTypes.STRING,
    }, {
        tableName: 'goods',
    },
);