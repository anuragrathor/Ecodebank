const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('players', {
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
        short_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        nationality: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        batting_style: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        bowling_style: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        image: {
            type: DataTypes.STRING(255),
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
        tableName: 'players',
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
        ]
    });
};
