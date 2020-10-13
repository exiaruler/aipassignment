const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const fs = require('fs');
const multer=require('multer');
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
    const { username, title, favour_description, rewards, image } = req.body;
    const newFavourRequest = await pool.query(
      "INSERT INTO favourRequest(title, favour_description, rewards, image) VALUES($1, $2, $3, $4) RETURNING *",
      [title, favour_description, rewards, image]
    );
    res.json(newFavourRequest);
  } catch (err) {
    console.error(err.message);
  }
});
// get ALL favourRequests
router.get("/getAllFavourRequest", auth, async (req, res) => {
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
router.get("/getFavourRequest/:title", auth, async (req, res) => {
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
router.put("/favourRequest/:id", auth, async (req, res) => {
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
router.get("/deleteFavourRequest/:id", auth, async (req, res) => {
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

module.exports = router;