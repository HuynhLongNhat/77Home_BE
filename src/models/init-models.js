var DataTypes = require("sequelize").DataTypes;
var _amenities = require("./amenities");
var _apartments = require("./apartments");
var _appointments = require("./appointments");
var _buildings = require("./buildings");
var _conditions = require("./conditions");
var _contracts = require("./contracts");
var _entities_amenities = require("./entities_amenities");
var _houses = require("./houses");
var _paymenthistorys = require("./paymenthistorys");
var _roles = require("./roles");
var _rooms = require("./rooms");
var _user_roles = require("./user_roles");
var _users = require("./users");
var _wards = require("./wards");

function initModels(sequelize) {
  var amenities = _amenities(sequelize, DataTypes);
  var apartments = _apartments(sequelize, DataTypes);
  var appointments = _appointments(sequelize, DataTypes);
  var buildings = _buildings(sequelize, DataTypes);
  var conditions = _conditions(sequelize, DataTypes);
  var contracts = _contracts(sequelize, DataTypes);
  var entities_amenities = _entities_amenities(sequelize, DataTypes);
  var houses = _houses(sequelize, DataTypes);
  var paymenthistorys = _paymenthistorys(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var rooms = _rooms(sequelize, DataTypes);
  var user_roles = _user_roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var wards = _wards(sequelize, DataTypes);

  roles.belongsToMany(users, { as: 'users_id_users', through: user_roles, foreignKey: "roles_id", otherKey: "users_id" });
  users.belongsToMany(roles, { as: 'roles_id_roles', through: user_roles, foreignKey: "users_id", otherKey: "roles_id" });
  apartments.belongsTo(buildings, { as: "building", foreignKey: "building_id"});
  buildings.hasMany(apartments, { as: "apartments", foreignKey: "building_id"});
  paymenthistorys.belongsTo(contracts, { as: "contract", foreignKey: "contract_id"});
  contracts.hasMany(paymenthistorys, { as: "paymenthistories", foreignKey: "contract_id"});
  conditions.belongsTo(houses, { as: "house", foreignKey: "house_id"});
  houses.hasMany(conditions, { as: "conditions", foreignKey: "house_id"});
  rooms.belongsTo(houses, { as: "house", foreignKey: "house_id"});
  houses.hasMany(rooms, { as: "rooms", foreignKey: "house_id"});
  user_roles.belongsTo(roles, { as: "role", foreignKey: "roles_id"});
  roles.hasMany(user_roles, { as: "user_roles", foreignKey: "roles_id"});
  apartments.belongsTo(users, { as: "owner", foreignKey: "owner_id"});
  users.hasMany(apartments, { as: "apartments", foreignKey: "owner_id"});
  appointments.belongsTo(users, { as: "renter", foreignKey: "renterId"});
  users.hasOne(appointments, { as: "appointment", foreignKey: "renterId"});
  buildings.belongsTo(users, { as: "createdBy_user", foreignKey: "createdBy"});
  users.hasMany(buildings, { as: "buildings", foreignKey: "createdBy"});
  contracts.belongsTo(users, { as: "renter", foreignKey: "renterId"});
  users.hasOne(contracts, { as: "contract", foreignKey: "renterId"});
  houses.belongsTo(users, { as: "owner", foreignKey: "owner_id"});
  users.hasMany(houses, { as: "houses", foreignKey: "owner_id"});
  user_roles.belongsTo(users, { as: "user", foreignKey: "users_id"});
  users.hasMany(user_roles, { as: "user_roles", foreignKey: "users_id"});
  buildings.belongsTo(wards, { as: "ward", foreignKey: "ward_id"});
  wards.hasMany(buildings, { as: "buildings", foreignKey: "ward_id"});
  houses.belongsTo(wards, { as: "ward", foreignKey: "ward_id"});
  wards.hasMany(houses, { as: "houses", foreignKey: "ward_id"});

  return {
    amenities,
    apartments,
    appointments,
    buildings,
    conditions,
    contracts,
    entities_amenities,
    houses,
    paymenthistorys,
    roles,
    rooms,
    user_roles,
    users,
    wards,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
