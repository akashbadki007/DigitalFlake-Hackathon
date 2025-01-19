const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnects = async () => {

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Database Connected Successfully");
    } catch(err) {
        console.log("❌ Error connecting to the database:");
        console.error(err);
        process.exit(1);
    }
}