const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const connectDB = require("./app/config/db");



require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

;

;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS
app.set("view engine", "ejs");
app.set("views", "views");


app.use("/admin",require('./app/routes/category'))
app.use("/admin",require('./app/routes/calculator'))
app.use("/",require('./app/routes/user.routes'))




// Start server after database connections are established
const PORT =  2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT} `);

});
