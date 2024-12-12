const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apartments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Floor_Number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    area: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    numberOfBedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numberOfBathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxOccupants: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    monthlyRent: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    building_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'buildings',
        key: 'id'
      }
    },
    owner_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'users',
        key: 'citizennumber'
      }
    }
  }, {
    sequelize,
    tableName: 'apartments',
    timestamps: true,
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
        name: "building_id",
        using: "BTREE",
        fields: [
          { name: "building_id" },
        ]
      },
      {
        name: "owner_id",
        using: "BTREE",
        fields: [
          { name: "owner_id" },
        ]
      },
    ]
  });
};
