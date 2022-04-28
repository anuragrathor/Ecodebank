const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_teams', {
        id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        fixture_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'fixtures',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.CHAR(36),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        players: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        captain_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        vice_captain_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        total_points: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        merchant_id: {
            type: DataTypes.INTEGER,
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
        tableName: 'user_teams',
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
                name: "user_teams_fixture_id_user_id_name_merchant_id_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "fixture_id"},
                    {name: "user_id"},
                    {name: "name"},
                    {name: "merchant_id"},
                ]
            },
        ]
    });
};
