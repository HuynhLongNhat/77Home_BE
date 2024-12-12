const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buildings', {
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    yearBuilt: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    numberOfFloors: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: false
    },
    region: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ownerRepresent: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    ward_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'wards',
        key: 'id'
      }
    },
    createdBy: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'users',
        key: 'citizennumber'
      }
    }
  }, {
    sequelize,
    tableName: 'buildings',
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
        name: "ward_id",
        using: "BTREE",
        fields: [
          { name: "ward_id" },
        ]
      },
      {
        name: "createdBy",
        using: "BTREE",
        fields: [
          { name: "createdBy" },
        ]
      },
    ]
  });
};
