const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const houses = sequelize.define(
    "houses",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      yearBuilt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      numberOfFloors: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberRooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      area: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
      region: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      position: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ward_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wards",
          key: "id",
        },
      },
      owner_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: "users",
          key: "citizennumber",
        },
      },
    },
    {
      sequelize,
      tableName: "houses",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "ward_id",
          using: "BTREE",
          fields: [{ name: "ward_id" }],
        },
        {
          name: "owner_id",
          using: "BTREE",
          fields: [{ name: "owner_id" }],
        },
      ],
    }
  );
  houses.associate = (models) => {
    houses.hasMany(models.conditions, {
      as: "conditions",
      foreignKey: "house_id",
    });
    houses.hasMany(models.rooms, { as: "rooms", foreignKey: "house_id" });
    houses.belongsTo(models.users, { as: "owner", foreignKey: "owner_id" });
    houses.belongsTo(models.wards, { as: "ward", foreignKey: "ward_id" });
  };
  return houses;
};
