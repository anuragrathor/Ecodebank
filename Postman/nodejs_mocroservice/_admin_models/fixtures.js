const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('fixtures', {
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
        competition_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'competitions',
                key: 'id'
            }
        },
        competition_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        teama: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        teama_id: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        teama_image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        teama_score: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        teama_short_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        teamb: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        teamb_id: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        teamb_image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        teamb_score: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        teamb_short_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        format: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        format_str: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        starting_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        pre_squad: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        lineup_announced: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM('NOT STARTED', 'LIVE', 'IN REVIEW', 'COMPLETED', 'CANCELED'),
            allowNull: false,
            defaultValue: "NOT STARTED"
        },
        status_note: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        last_squad_update: {
            type: DataTypes.DATE,
            allowNull: true
        },
        mega_value: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
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
        tableName: 'fixtures',
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
                name: "fixtures_competition_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "competition_id"},
                ]
            },
            {
                name: "fixtures_teama_teamb_name_index",
                using: "BTREE",
                fields: [
                    {name: "teama"},
                    {name: "teamb"},
                    {name: "name"},
                ]
            },
        ]
    });
};
