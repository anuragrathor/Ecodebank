const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('merchant_transactions', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        merchant_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'merchants',
                key: 'id'
            }
        },
        amount: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('DEPOSIT', 'WITHDRAW', 'COMMISSION', 'REFUND'),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'merchant_transactions',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "id"},
                ]
            },
            {
                name: "merchant_transactions_merchant_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "merchant_id"},
                ]
            },
        ]
    });
};
