const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    area: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: false
    },
    maxOccupants: {
      type: DataTypes.INTEGER,
      allowNull: false
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
      type: DataTypes.STRING(200),
      allowNull: false
    },
    house_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'houses',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'rooms',
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
        name: "house_id",
        using: "BTREE",
        fields: [
          { name: "house_id" },
        ]
      },
    ]
  });
};
