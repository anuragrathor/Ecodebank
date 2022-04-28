const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
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
    amount: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.STRING(255),
        allowNull: false
    },
      description: {
          type: DataTypes.STRING(255),
          allowNull: false
      },
      type: {
          type: DataTypes.ENUM('DEPOSIT', 'WITHDRAW', 'CONTEST JOIN', 'CONTEST WON', 'REFUND'),
          allowNull: false
      },
      contest_id: {
          type: DataTypes.CHAR(36),
          allowNull: true,
          references: {
              model: 'contests',
              key: 'id'
          }
      },
      private_contest_id: {
          type: DataTypes.CHAR(36),
          allowNull: true,
          references: {
              model: 'private_contests',
              key: 'id'
          }
      },
      admin_contest_id: {
          type: DataTypes.CHAR(36),
          allowNull: true
      },
      reference_id: {
          type: DataTypes.STRING(255),
          allowNull: true,
          unique: "payments_reference_id_unique"
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
    tableName: 'payments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
        {
            name: "payments_reference_id_unique",
            unique: true,
            using: "BTREE",
            fields: [
                {name: "reference_id"},
            ]
        },
        {
            name: "payments_user_id_foreign",
            using: "BTREE",
            fields: [
                {name: "user_id"},
            ]
        },
        {
            name: "payments_contest_id_foreign",
            using: "BTREE",
            fields: [
                {name: "contest_id"},
            ]
        },
        {
            name: "payments_private_contest_id_foreign",
            using: "BTREE",
            fields: [
                {name: "private_contest_id"},
            ]
        },
    ]
  });
};
