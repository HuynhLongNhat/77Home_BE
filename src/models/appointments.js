const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('appointments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    acceptedTine: {
      type: DataTypes.DATE,
      allowNull: true
    },
    abortedTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    abortedReason: {
      type: DataTypes.DATE,
      allowNull: true
    },
    meetDate: {
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
      unique: "appointments_ibfk_1"
    }
  }, {
    sequelize,
    tableName: 'appointments',
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
