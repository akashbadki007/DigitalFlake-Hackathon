const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },

  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },

  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse; 
