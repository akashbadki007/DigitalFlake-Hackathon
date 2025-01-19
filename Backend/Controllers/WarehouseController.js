const Warehouse = require("../Models/Warehouse");
const City = require("../Models/City");
const State = require("../Models/State");

// Create Warehouse
exports.createWarehouse = async (req, res) => {
    
    try {
        const { name, stateId, cityId, status } = req.body;

        // Validate input fields
        if (!name || !stateId || !cityId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: name, state, city, and status.",
            });
        }

    // Validate State and City existence
    const existingState = await State.findById(stateId);
    const existingCity = await City.findById(cityId);

    if (!existingState || !existingCity) {
      return res.status(404).json({
        success: false,
        message: "Invalid state or city ID provided.",
      });
    }
    const response = await Warehouse.create({ name, stateId, cityId, status });
   
    res.status(201).json({
      success: true,
      data: response,
      message: "Warehouse created successfully.",
    });

  } catch (error) {
    console.error("Error creating warehouse:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating warehouse. Please try again later.",
    });
  }
};

// Get all Warehouses
exports.getWarehouses = async (req, res) => {
    
    try {
        const warehouses = await Warehouse.find()
        .populate("stateId", "name code")
        .populate("cityId", "name");
        
        res.status(200).json({
            success: true,
            message: "Warehouses fetched successfully.",
            data: warehouses,
        });

    } catch (error) {
        console.error("Error fetching warehouses:", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching warehouses. Please try again later.",
        });
    }
};

// Update Warehouse
exports.updateWarehouse = async (req, res) => {
  

  try {
    
    const { id } = req.params;
    const { name, stateId, cityId, status } = req.body;
    
    // Validate input fields
    if (!id || !name || !stateId || !cityId || !status) {
        return res.status(400).json({
            success: false,
            message: "All fields are required: id, name, state, city, and status.",
        });
    }

    // Validate State and City existence
    const existingState = await State.findById(stateId);
    const existingCity = await City.findById(cityId);

    if (!existingState || !existingCity) {
        return res.status(404).json({
           success: false,
           message: "Invalid state or city ID provided.",
        });
    }

    const warehouse = await Warehouse.findByIdAndUpdate( id, { name, stateId, cityId, status }, { new: true } );

    if (!warehouse) {
        return res.status(404).json({
          success: false,
           message: "Warehouse not found.",
        });
    }

    res.status(200).json({
      success: true,
      message: "Warehouse updated successfully.",
      data: warehouse,
    });


  } catch (error) {
        console.error("Error updating warehouse:", error.message);
        res.status(500).json({
            success: false,
            message: "Error updating warehouse. Please try again later.",
        });
    }
};

// Delete Warehouse
exports.deleteWarehouse = async (req, res) => {
    
    try {
        const { id } = req.params;
        const warehouse = await Warehouse.findByIdAndDelete(id);

        if(!warehouse) {
            return res.status.json({
                success:false,
                msg:"Warehouse not found."
            })
        }

        res.status(200).json({
            success:true,
            msg:"Warehouse deleted successfully."
        })

  } catch (error) {
    console.error("Error deleting warehouse:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting warehouse. Please try again later.",
    });
  }
}; 
