const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entities_amenities', {
    entities_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amenities_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'entities_amenities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "entities_id" },
          { name: "amenities_id" },
        ]
      },
    ]
  });
};
