const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const appointments = sequelize.define(
    "appointments",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      acceptedTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      abortedTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      paymentTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      abortedReason: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      rejectedTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rejectedReason: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      meetDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rentEntityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      renterId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: "users",
          key: "citizennumber",
        },
        unique: "appointments_ibfk_1",
      },
    },
    {
      sequelize,
      tableName: "appointments",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "renterId",
          unique: true,
          using: "BTREE",
          fields: [{ name: "renterId" }],
        },
      ],
    }
  );
  appointments.associate = (models) =>{
      appointments.hasMany(models.paymenthistorys, {
        as: "paymentHistories",
        foreignKey: "oppointment_id", 
      });

       appointments.belongsTo(models.users, {
         as: "renter",
         foreignKey: "renterId",
       });
        appointments.belongsTo(models.rooms, {
          as: "room",
          foreignKey: "rentEntityId",
        });

  }
  return appointments; ;
};
