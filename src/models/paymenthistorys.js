const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const paymenthistorys = sequelize.define(
    "paymenthistorys",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      oppointment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "oppointments",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "paymenthistorys",
      updatedAt: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "contract_id",
          using: "BTREE",
          fields: [{ name: "contract_id" }],
        },
      ],
    }
  );
   paymenthistorys.associate = (models) => {
     paymenthistorys.belongsTo(models.appointments, {
       as: "appointment",
       foreignKey: "oppointment_id",
     });
   };

  return paymenthistorys;
};
