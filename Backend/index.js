// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // For loading environment variables

// Initialize the express app
const app = express();

// Middleware setup
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// PORT setup
const PORT = process.env.PORT || 4000;

// Routes
const route = require("./Routes/route");
app.use('/api/v1/', route);

// DB Connection
require('./Config/dbConnect').dbConnects()

// Test Route for Server Status
app.get('/', (req, res) => {
  res.send(`<h1> THIS IS HOME PAGE... </h1>`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at PORT NO: ${PORT}`);
});