const City = require("../Models/City");
const State = require("../Models/State");


// Create City
exports.createCity = async (req, res) => {
  try {
    const { name, code, stateId, status } = req.body;

    // Validation || Check if all fields are entered
    if (!name || !code || !stateId) {
      return res.status(400).json({
        success: false,
        msg: "Please enter all required fields.",
      });
    }

    // Check if the state exists
    const state = await State.findById(stateId);
    if (!state) {
      return res.status(404).json({
        success: false,
        msg: "State not found.",
      });
    }

    const city = await City.create({ name, code, stateId, status: status || "Active" });

    res.status(201).json({
      success: true,
      msg: "City created successfully.",
      data: city,
    });


  } catch (err) {
    console.error("Error during create city:", err.message);
    res.status(500).json({
      success: false,
      msg: "An error occurred during city creation. Please try again later.",
    });
  }
};

// Get all Cities
exports.getCities = async (req, res) => {
  try {

    // const cities = await City.find().populate("stateId", "name");
    const cities = await City.find().populate("stateId", "name");

    res.status(200).json({
      success: true,
      msg: "Cities fetched successfully.",
      data: cities,
    });


  } catch (err) {
    console.error("Error during getCities:", err.message);
    res.status(500).json({
      success: false,
      msg: "An error occurred while fetching cities. Please try again later.",
    });
  }
};


// Update City
exports.updateCity = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, code, stateId, status } = req.body;

    // Validation || Check if all fields are entered
    if (!id || !name || !code  || !stateId || !status) {
      return res.status(400).json({
        success: false,
        msg: "Please provide all fields.",
      });
    }

    const city = await City.findByIdAndUpdate(id, { name, code, stateId, status },{ new: true } );

    if (!city) {
      return res.status(404).json({
        success: false,
        msg: "City not found.",
      });
    }

    res.status(200).json({
      success: true,
      msg: "City updated successfully.",
      data: city,
    });


  } catch (err) {
    console.error("Error during update city:", err.message);
    res.status(500).json({
      success: false,
      msg: "An error occurred while updating the city. Please try again later.",
    });
  }
};


// Delete City
exports.deleteCity = async (req, res) => {
  try {
    const { id } = req.params;

    const city = await City.findByIdAndDelete(id);

    if (!city) {
      return res.status(404).json({
        success: false,
        msg: "City not found.",
      });
    }

    res.status(200).json({
      success: true,
      msg: "City deleted successfully.",
      data: city,
    });

    
  } catch (err) {
    console.error("Error during delete city:", err.message);
    res.status(500).json({
      success: false,
      msg: "An error occurred while deleting the city. Please try again later.",
    });
  }
};
