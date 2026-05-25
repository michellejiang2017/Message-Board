// Import the express module
const express=require('express');
// Create an instance of the express application
const app=express();
// Specify a port number for the server
const port=5000;
const cors = require("cors");

app.use(cors());
// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// use middleware to parse json request bodies
app.use(express.json());

// Create a route and a handler for GET /posts
app.get("/posts", (req, res) => {
    let ret = [];
    // Do things to get the data...
    // Send the data array as a JSON response
    res.status(200).json(ret);
});

app.post("/posts", (req, res) => {
    const data = req.body
    // Add data to the database
    // Send a response
});