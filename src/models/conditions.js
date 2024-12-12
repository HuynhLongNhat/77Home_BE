const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conditions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    minRetalPeriod: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    allowPets: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    depositMonths: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    smokingAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    curfewTime: {
      type: DataTypes.TIME,
      allowNull: true
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
    tableName: 'conditions',
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
        name: "house_id",
        using: "BTREE",
        fields: [
          { name: "house_id" },
        ]
      },
    ]
  });
};
