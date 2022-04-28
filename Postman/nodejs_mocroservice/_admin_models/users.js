const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        merchant_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING(1),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        state_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: 'states',
                key: 'id'
            }
        },
        balance: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        winning_amount: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        deposited_balance: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        cash_bonus: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        phone_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        document_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        is_locked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        is_username_update: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        bank_update_count: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        can_played: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        referral_code: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        referral_amount: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        referral_id: {
            type: DataTypes.CHAR(36),
            allowNull: true
        },
        is_deposit: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        referral_pending_amount: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: "user"
        },
        remember_token: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        verification_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        fcm_token: {
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
        tableName: 'users',
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
                name: "users_state_id_foreign",
                using: "BTREE",
                fields: [
                    {name: "state_id"},
                ]
            },
        ]
    });
};
