const express = require("express");
const apiRoutes = require("./routes");
const cors = require("cors");
const app = express();
let mongoose = require("mongoose");
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use("/api", apiRoutes);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});

mongoose.connect("mongodb://localhost/resthub", { useUnifiedTopology:true,useNewUrlParser: true });

// Heroku Mongoose connection
// mongoose.connect('mongodb://heroku_5686p02g:sia8l3fni4jmu7qbn0ac1t75mf@ds349857.mlab.com:49857/heroku_5686p02g', { useNewUrlParser: true });

var db = mongoose.connection;

// Added check for DB connection

if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

