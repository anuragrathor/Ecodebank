const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('merchants', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "merchants_email_unique"
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_own_payment_gateway: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        wallet: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        domain: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "merchants_domain_unique"
        },
        fcmTokens: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: "merchants_fcmtokens_unique"
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
        tableName: 'merchants',
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
                name: "merchants_email_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "email"},
                ]
            },
            {
                name: "merchants_domain_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "domain"},
                ]
            },
            {
                name: "merchants_fcmtokens_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "fcmTokens"},
                ]
            },
        ]
    });
};
