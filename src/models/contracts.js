const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contracts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateSigned: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monthlyRent: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startRentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endRentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    rentEntityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    renterId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'users',
        key: 'citizennumber'
      },
      unique: "contracts_ibfk_1"
    }
  }, {
    sequelize,
    tableName: 'contracts',
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
        name: "renterId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "renterId" },
        ]
      },
    ]
  });
};
