const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define(
    "users",
    {
      citizenNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(70),
        allowNull: false,
        unique: "email",
      },
      phone: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: "phone",
      },
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      gender: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "citizenNumber" }],
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
        {
          name: "phone",
          unique: true,
          using: "BTREE",
          fields: [{ name: "phone" }],
        },
      ],
    }
  );
  users.associate = (models) => {
    users.hasMany(models.user_roles, {
      as: "user_roles",
      foreignKey: "users_id",
    });
    users.hasMany(models.buildings, {
      as: "buildings",
      foreignKey: "createdBy",
    });
    users.hasMany(models.apartments, {
      as: "apartments",
      foreignKey: "owner_id",
    });
    users.hasOne(models.appointments, {
      as: "appointment",
      foreignKey: "renterId",
    });
    users.hasOne(models.contracts, { as: "contract", foreignKey: "renterId" });
    users.hasMany(models.houses, { as: "houses", foreignKey: "owner_id" });
  };

  return users;
};
