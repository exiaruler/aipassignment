const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const fs = require("fs");
const multer = require("multer");
const createJWT = require("../functions/createJWT");
const auth = require("../middleware/authoriseUser");
const { Console } = require("console");

/*
 * Create destination for image uploads with unique ID
 */
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

/*
 * Initalise uploads  
 */
var upload = multer({ dest: "./uploads/" });

/*
 * Add favour request route
 */
router.post("/addFavourRequest", auth, async (req, res) => {
  try {
    var date = new Date();
    const { title, favour_description, rewards } = req.body;
    // Retrieve current date to go with favour request
    const favourDate =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    console.log(title);
    // Retrieves the ID of the currently logged in user
    const username = await pool.query(
      "SELECT * FROM userData WHERE user_id = $1",
      [req.user.id]
    );
    // Const to insert request contents into database
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
    // Inserts contents of favour request into the database
    res.json(newFavourRequest);
    console.log("Favour added");
  } catch (err) {
    console.error(err.message);
  }
});

/*
 * Get ALL favour requests route
 */
router.get("/getAllFavourRequest", async (req, res) => {
  try {
    // Const to retrieve all current favour requests
    const allFavourRequests = await pool.query(
      "SELECT * FROM favourRequest;"
    );
    // Returns all current favour requests
    res.json(allFavourRequests.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/*
 * Get a favour request by ID route
 */
router.get("/getFavourRequest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Const to retreive a specific favour request (ID) from database
    const favReq = await pool.query(
      "SELECT * FROM favourRequest WHERE favour_id = $1",
      [id]
    );
    // Returns that user's favour requests
    res.json(favReq.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/*
 * Get favour requests by user route
 */
router.get("/getallfavourrequests", async (req, res) => {
  try {
    // Retrieves username from database
    const username = await pool.query(
      "SELECT user_name FROM userData WHERE user_id = $1",
      [req.user.id]
    );
    // Retrieves all favour requests of a user
    const allFavReq = await pool.query(
      "SELECT title, favour_description, rewards, favourrequest_date FROM favourRequest WHERE user_name=$1 ;",
      [username.rows[0].user_name]
    );
    // Returns the favour requests
    res.json(allFavReq.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/*
 * Update favour requests by ID route
 */
router.put("/updateFavourRequest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, favour_description, rewards } = req.body;
    // Update favour request by it's ID
    const updateFavourRequest = await pool.query(
      "UPDATE favourRequest SET (title, favour_description, rewards) = ($1, $2, $3) WHERE favour_id = $4",
      [title, favour_description, rewards, id]
    );
    console.log("Favour request " + [id] + " updated");
    res.json("Favour request updated");
  } catch (err) {
    console.error(err.message);
  }
});

/*
 * Delete favour requests by ID route
 */
router.delete("/deleteFavourRequest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Delete favour request by ID
    const deleteFavourRequest = await pool.query(
      "DELETE FROM favourRequest WHERE favour_id = $1",
      [id]
    );
    console.log("Favour request " + [id] + " deleted");
    res.json("Favour request deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
