const State = require("../Models/State");

// Create State
exports.createState = async (req, res) => {

    try{

        const { name, code, status } = req.body;

        // Validation ||  Check if all fields are entered
        if(!name || !code){
            return res.status(400).json({
                success: false,
                msg: "Please enter all fields."
            });
        }

        const response = await State.create({name, code, status});

        res.status(201).json({
            success: true,
            msg: "State created successfully.",
            data: response
        });

    } catch(err) {
        console.error("Error during create state:", err.message);
        res.status(500).json({
            success: false,
            msg: "An error occurred during create state. Please try again later.",
        });
    }

}


// Get all States
exports.getStates = async (req, res) => {

    try {
        // Use a different name for the result of the query
        const states = await State.find();
        res.status(200).json({
            success: true,
            msg: "States fetched successfully.",
            data: states, // Updated to use the new variable name
        });

    } catch (err) {
        console.error("Error during getStates:", err.message);
        res.status(500).json({
            success: false,
            msg: "Error fetching states. Please try again later.",
        });
    }
};

  
// Update State
exports.updateState = async (req, res) => {
    
    try {

        const { id } = req.params;
        const { name, code, status } = req.body;

        // Validation ||  Check if all fields are entered
        if(!id || !name || !code || !status){
            return res.status(400).json({
                success: false,
                msg: "Please enter all fields."
            });
        }

        const state = await State.findByIdAndUpdate( id, { name, code, status },{ new: true } );

        if (!state) {
            return res.status(404).json({ message: "State not found" });
        }

        res.status(201).json({
            success: true,
            msg: "State updated successfully.",
            data: state
        });
  
    } catch (error) {
      res.status(500).json({ message: "Error updating state" });
    }
  };
  

  // Delete State
  exports.deleteState = async (req, res) => {
   
    try {
      const { id } = req.params;
      const state = await State.findByIdAndDelete(id);

      if (!state) {
            return res.status(404).json({ message: "State not found" });
        }
        
        res.status(201).json({
            success: true,
            message: "State deleted successfully",
            data: state
        });

    } catch (error) {
      res.status(500).json({ message: "Error deleting state" });
    }
};