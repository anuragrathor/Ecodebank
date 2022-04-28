const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ranks', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        rank_category_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'rank_categories',
                key: 'id'
            }
        },
        rank: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        from: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        to: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        percentage: {
            type: DataTypes.DOUBLE(8, 2),
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
        tableName: 'ranks',
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
                name: "ranks_rank_category_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "rank_category_id"},
                ]
            },
        ]
    });
};
