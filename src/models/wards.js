const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const wards = sequelize.define(
    "wards",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "wards",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  wards.associate = (models) => {
    wards.hasMany(models.buildings, { as: "buildings", foreignKey: "ward_id" });
  };
  return wards;
};
