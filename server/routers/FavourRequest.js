const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const fs = require("fs");
const multer = require("multer");
const createJWT = require("../functions/createJWT"); // lily
const auth = require("../middleware/authoriseUser"); //jwt token for user access

//creates destination for image files and gives them a unique ID
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//init upload
var upload = multer({ dest: "./uploads/" });

//REQUESTFAVOURS
// add favourRequest
router.post("/addFavourRequest", auth, async (req, res) => {
  try {
    var date = new Date();
    const { title, favour_description, rewards } = req.body;
    //get current date
    const favourDate =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    console.log(title);
    const username = await pool.query(
      "SELECT * FROM userData WHERE user_id = $1",
      [req.user.id]
    );
    const newFavourRequest = await pool.query(
      "INSERT INTO favourRequest(title, user_name, user_id, favour_description, rewards, favourRequest_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        title,
        username.rows[0].user_name,
        username.rows[0].user_id,
        favour_description,
        rewards,
        favourDate,
      ]
    );
    res.json(newFavourRequest);
    console.log("Favour added");
  } catch (err) {
    console.error(err.message);
  }
});
// get ALL favourRequests
router.get("/getAllFavourRequest", async (req, res) => {
  try {
    const allFavourRequests = await pool.query("SELECT * FROM favourRequest;");
    res.json(allFavourRequests.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// get A favourRequest
router.get("/getFavourRequest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const favReq = await pool.query(
      "SELECT * FROM favourRequest WHERE favour_id = $1",
      [id]
    );
    res.json(favReq.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/getallfavourrequests", auth, async (req, res) => {
  try {
    const username = await pool.query(
      "SELECT user_name FROM userData WHERE user_id = $1",
      [req.user.id]
    );
    const allFavReq = await pool.query(
      "SELECT title, favour_description, rewards, favourrequest_date FROM favourRequest WHERE user_name=$1 ;",
      [username.rows[0].user_name]
    );
    res.json(allFavReq.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// update favourRequest
router.put("/updateFavourRequest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, favour_description, rewards } = req.body;
    const updateFavourRequest = await pool.query(
      "UPDATE favourRequest SET (title, favour_description, rewards) = ($1, $2, $3) WHERE favour_id = $4",
      [title, favour_description, rewards, id]
    );
    res.json("Favour updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete favourRequest
router.delete("/deleteFavourRequest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleteFavourRequest = await pool.query(
      "DELETE FROM favourRequest WHERE favour_id = $1",
      [id]
    );
    res.json("Favour request deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
