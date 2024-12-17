import db from "../models/index";

const getAllBuildings = async () => {
  try {
    const buildings = await db.buildings.findAll({
      attributes: { exclude: ["ward_id", "createdBy"] },
      include: [
        {
          model: db.wards,
          as: "ward",
          attributes: ["id", "name"],
        },
        {
          model: db.users,
          as: "createdBy_user",
          attributes: ["citizenNumber", "fullName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return { EM: "OK", EC: 0, DT: buildings };
  } catch (error) {
    return { EM: error.message, EC: -1, DT: "" };
  }
};

const getBuildingById = async (id) => {
  try {
    const building = await db.buildings.findOne({
      where: { id: id },
      attributes: { exclude: ["ward_id", "createdBy"] },
      include: [
        {
          model: db.wards,
          as: "ward",
          attributes: ["id", "name"],
        },
        {
          model: db.users,
          as: "createdBy_user",
          attributes: ["citizenNumber", "fullName", "email", "phone"],
        },
      ],
    });
    if (!building) {
      return { EM: "Không tìm thấy building", EC: -1, DT: "" };
    }
    return { EM: "OK", EC: 0, DT: building };
  } catch (error) {
    return { EM: error.message, EC: -1, DT: "" };
  }
};

const createBuilding = async (buildingData) => {
  try {
    const newBuilding = await db.buildings.create({
      name: buildingData.name,
      address: buildingData.address,
      description: buildingData.description,
      numberOfFloors: buildingData.numberOfFloors,
      area: buildingData.area,
      status: buildingData.status,
      avatar: buildingData.avatar,
      longitude: buildingData.longitude,
      latitude: buildingData.latitude,
      numberOfRooms: buildingData.numberOfRooms,
      yearBuilt: buildingData.yearBuilt,
      region: buildingData.region,
      ownerRepresent: buildingData.ownerRepresent,
      ward_id: buildingData.ward_id,
      createdBy: buildingData.createdBy,
    });
    return { EM: "Thêm mới tòa nhà thành công", EC: 0, DT: newBuilding };
  } catch (error) {
    return { EM: error.message, EC: -1, DT: "" };
  }
};

const updateBuilding = async (id, buildingData) => {
  try {
    const building = await db.buildings.findByPk(id);
    if (!building) {
      return { EM: "Không tìm thấy building", EC: -1, DT: "" };
    }
    await building.update({
      name: buildingData.name,
      address: buildingData.address,
      description: buildingData.description,
      numberOfFloors: buildingData.numberOfFloors,
      area: buildingData.area,
      status: buildingData.status,
      avatar: buildingData.avatar,
      longitude: buildingData.longitude,
      latitude: buildingData.latitude,
      numberOfRooms: buildingData.numberOfRooms,
      yearBuilt: buildingData.yearBuilt,
      region: buildingData.region,
      ownerRepresent: buildingData.ownerRepresent,
      ward_id: buildingData.ward_id,
      createdBy: buildingData.createdBy,
    });
    return { EM: "OK", EC: 0, DT: building };
  } catch (error) {
    return { EM: error.message, EC: -1, DT: "" };
  }
};

const deleteBuilding = async (id) => {
  try {
    const building = await db.buildings.findByPk(id);
    if (!building) {
      return { EM: "Không tìm thấy building", EC: -1, DT: "" };
    }
    await building.destroy();
    return { EM: "OK", EC: 0, DT: "" };
  } catch (error) {
    return { EM: error.message, EC: -1, DT: "" };
  }
};

module.exports = {
  getAllBuildings,
  getBuildingById,
  createBuilding,
  updateBuilding,
  deleteBuilding,
};
