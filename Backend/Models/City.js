const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({

    name: {
        type:String,
        required:true,
    },

    code: { 
        type: String, 
        required: true 
    },
    
    stateId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "State", 
        required: true 
       
    },
    
    status: { 
        type: String, 
        enum: ["Active", "Inactive"], 
        default: "Active"
    },

});

const City = mongoose.model("City", citySchema);

module.exports = City;
