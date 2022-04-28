const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('contests', {
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
        contest_category_id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            references: {
                model: 'contest_categories',
                key: 'id'
            }
        },
        invite_code: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('NOT STARTED', 'LIVE', 'IN REVIEW', 'COMPLETED', 'CANCELED'),
            allowNull: false,
            defaultValue: "NOT STARTED"
        },
        commission: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        total_teams: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        entry_fee: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        max_team: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        prize: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        winner_percentage: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        is_confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        prize_breakup: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        auto_create_on_full: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('PRACTICE', 'PAID', 'FREE', 'DISCOUNT'),
            allowNull: false,
            defaultValue: "PAID"
        },
        is_mega_contest: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        bonus: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: 0.00
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
        tableName: 'contests',
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
                name: "contests_fixture_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "fixture_id"},
                ]
            },
            {
                name: "contests_contest_category_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "contest_category_id"},
                ]
            },
        ]
    });
};
