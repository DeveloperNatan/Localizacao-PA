const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// app use
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend/src/html/")));
app.use(express.static(path.join(__dirname, "../frontend/src")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user routes
app.use("/", require("./routes"));

// start server
app.listen(9000);
console.log("http://localhost:9000/");
