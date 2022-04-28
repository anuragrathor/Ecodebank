const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('contest_templates', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        contest_category_id: {
            type: DataTypes.CHAR(36),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "contest_templates_name_unique"
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
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
        auto_add: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        auto_create_on_full: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        commission: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_mega_contest: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        type: {
            type: DataTypes.ENUM('PRACTICE', 'PAID', 'FREE', 'DISCOUNT'),
            allowNull: false,
            defaultValue: "PAID"
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
        tableName: 'contest_templates',
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
                name: "contest_templates_name_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "name"},
                ]
            },
        ]
    });
};
