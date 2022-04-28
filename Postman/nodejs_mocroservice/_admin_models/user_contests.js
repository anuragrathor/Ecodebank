const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_contests', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        contest_id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            references: {
                model: 'contests',
                key: 'id'
            }
        },
        user_team_id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            references: {
                model: 'user_teams',
                key: 'id'
            }
        },
        rank: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        prize: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: true
        },
        merchant_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payment_data: {
            type: DataTypes.TEXT,
            allowNull: true
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
        tableName: 'user_contests',
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
                name: "user_contests_contest_id_user_team_id_merchant_id_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "contest_id"},
                    {name: "user_team_id"},
                    {name: "merchant_id"},
                ]
            },
            {
                name: "user_contests_user_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "user_id"},
                ]
            },
            {
                name: "user_contests_user_team_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "user_team_id"},
                ]
            },
        ]
    });
};
