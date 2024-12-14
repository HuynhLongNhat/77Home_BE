import buildingService from "../service/buildingService";

const getAllBuildings = async (req, res) => {
  try {
    const result = await buildingService.getAllBuildings();
    res.json(result);
  } catch (error) {
    res.status(500).json({ EM: error.message, EC: -1, DT: "" });
  }
};

const getBuildingById = async (req, res) => {
  try {
    const result = await buildingService.getBuildingById(req.params.id);
    if (!result.DT) {
      return res.status(404).json(result);
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ EM: error.message, EC: -1, DT: "" });
  }
};

const createBuilding = async (req, res) => {
  try {
    const result = await buildingService.createBuilding(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ EM: error.message, EC: -1, DT: "" });
  }
};

const updateBuilding = async (req, res) => {
  try {
    const result = await buildingService.updateBuilding(
      req.params.id,
      req.body
    );
    if (!result.DT) {
      return res.status(404).json(result);
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({ EM: error.message, EC: -1, DT: "" });
  }
};

const deleteBuilding = async (req, res) => {
  try {
    const result = await buildingService.deleteBuilding(req.params.id);
    if (!result.DT) {
      return res.status(404).json(result);
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ EM: error.message, EC: -1, DT: "" });
  }
};

module.exports = {
  getAllBuildings,
  getBuildingById,
  createBuilding,
  updateBuilding,
  deleteBuilding,
};
