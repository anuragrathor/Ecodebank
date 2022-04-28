const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('settings', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        key: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "settings_key_unique"
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'settings',
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
                name: "settings_key_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "key"},
                ]
            },
        ]
    });
};
