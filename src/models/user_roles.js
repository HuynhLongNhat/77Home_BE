const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const user_roles = sequelize.define(
    "user_roles",
    {
      users_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "users",
          key: "citizenNumber", // Chú ý sửa lại tên key
        },
      },
      roles_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "roles",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "user_roles",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "users_id" }, { name: "roles_id" }],
        },
        {
          name: "roles_id",
          using: "BTREE",
          fields: [{ name: "roles_id" }],
        },
      ],
    }
  );

  user_roles.associate = (models) => {
    user_roles.belongsTo(models.users, { as: "user", foreignKey: "users_id" });
    user_roles.belongsTo(models.roles, { as: "role", foreignKey: "roles_id" });
  };

  return user_roles;
};
