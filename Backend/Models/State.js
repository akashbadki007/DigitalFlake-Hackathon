const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true,
        unique:true,
        maxLength:50,
        trim: true,
    },
    
    code: { 
        type: String, 
        required: true, 
        unique: true 
    },

    status: { 
        type: String, 
        enum: ["Active", "Inactive"], 
        default: "Active"
    },
    

});

const State = mongoose.model("State", stateSchema);

module.exports = State;
  