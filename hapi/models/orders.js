module.exports = (sequelize, DataTypes) => {
    return  sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_status: {
            type: DataTypes.ENUM('0','1'), // 0未支付 1已支付
            defaultValue: '0'
        },
    }, {tableName: 'orders'})
};