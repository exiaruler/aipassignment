const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { query } = require("./db");
const querystring = require("querystring");

//middleware
app.use(cors());
app.use(express.json());
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
////////////////////////////////////////////////// user route
app.use("/auth", require("./routers/Users")); //login, sign up, edit account

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

////////////////////////////////////////////////// owefavour route
app.use("/owe", require("./routers/FavourOwe")); //login, sign up, edit account

////////////////////////////////////////////////// favourrequest route
app.use("/request", require("./routers/FavourRequest"));

//test post with postman
//console.log(req.body);

// DB TESTING pls ignore - Rey
app.post("/practice", async (req, res) => {
  try {
    const { description } = req.body;
    const newPrac = await pool.query(
      "INSERT INTO prac (description) VALUES($1)",
      [description]
    );
    res.json(newPrac);
  } catch (err) {
    console.error(err.message);
  }
});
