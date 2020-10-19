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

//REQUESTFAVOURS
// add favourRequest
app.post("/addFavourRequest", async (req, res) => {
  try {
    const { username, title, favour_description, rewards, image } = req.body;
    const newFavourRequest = await pool.query(
      "INSERT INTO favourRequest(title, favour_description, rewards, image) VALUES($1, $2, $3, $4) RETURNING *",
      [title, favour_description, rewards, image]
    );
    res.json(newFavourRequest);
    //console.log("User completing does not exist");
  } catch (err) {
    console.error(err.message);
  }
});
// get ALL favourRequests
app.get("/getAllFavourRequest", async (req, res) => {
  try {
    const allFavourRequests = await pool.query(
      "SELECT favour_id, title, favour_description, rewards, completing_username, complete, image FROM favourRequest;"
    );
    res.json(allFavourRequests.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// get A favourRequest
app.get("/getFavourRequest/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const favReq = await pool.query(
      "SELECT * FROM favourRequest WHERE title = $1",
      [title]
    );
    res.json(favReq.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// update favourRequest
app.put("/favourRequest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { favourtitle, description, reward, image } = req.body;
    const updateFavourRequest = await pool.query(
      "UPDATE favourRequest SET (title, favour_description, rewards, image) = ($1, $2, $3, $4) WHERE favour_id = $5",
      [id, favourtitle, description, reward, image]
    );
    res.json("Favour updated");
  } catch (err) {
    console.error(err.message);
  }
});
// delete favourRequest
app.get("/deleteFavourRequest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFavourRequest = await pool.query(
      "DELETE FROM favourRequest WHERE favour_id = $1",
      [id]
    );
    res.json("Favour request deleted");
  } catch (err) {
    console.error(err.message);
  }
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
