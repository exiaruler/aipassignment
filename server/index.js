const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { query } = require("./db");
const querystring = require("querystring");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    //console.log("call",file.mimetype);
    cb(null, Date.now() + ".jpg");
  },
});

//init upload
const upload = multer({ storage: storage });

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./uploads"));
//routes
app.get("/", function (req, res) {
  res.sendFile(__basedir + "/react/index.html");
});

//insert query to test your database connection using postman using sample table with no primary keys
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// ------------------------------------------------
// User route to: 'Users.js'
// ------------------------------------------------
app.use("/auth", require("./routers/Users"));

// ------------------------------------------------
// Start serving
// ------------------------------------------------
app.listen(5000, () => {
  console.log("server has started on port 5000");
});

////////////////////////////////////////////////// owefavour route
app.use("/owe", require("./routers/FavourOwe")); //login, sign up, edit account

////////////////////////////////////////////////// favourrequest route
app.use("/request", require("./routers/FavourRequest"));

//test post with postman
//console.log(req.body);
