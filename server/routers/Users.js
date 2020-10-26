/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/tree/master/server/routes
 *
 ***************************************************************************************************************/

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const createJWT = require("../functions/createJWT");
const verify = require("../middleware/verify");
const verifyNewUserEdit = require("../middleware/verifyNewUserEdit");
const auth = require("../middleware/authoriseUser");

// ------------------------------------------------
// Inserting new user details from 'SignUp.js' page
// ------------------------------------------------
router.post("/signup", verify, async (req, res) => {
  const role = "user"; // Set new user as a user
  const { fullName, email, password, userName } = req.body; // Get all information from user input from 'SignUp.js' page

  try {
    const existingUser = await pool.query(
      // Get all information matching 'username'
      "SELECT * FROM userData WHERE user_name = $1",
      [userName]
    );

    if (existingUser.rows.length > 0) {
      // To see if the database has existing user 'id's'
      return res.status(401).json("User already exist!");
    }
    const salt = await bcrypt.genSalt(8); // Set up encryption
    const secretPassword = await bcrypt.hash(password, salt); // Hide password

    const newUser = await pool.query(
      // Add new user into database
      "INSERT INTO userData (user_fullname, user_email, user_password, user_name, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [fullName, email, secretPassword, userName, role]
    );

    const jwtToken = createJWT(newUser.rows[0].user_id); // Create token

    return res.json({ jwtToken }); // Return token to client side
  } catch (err) {
    // Error occured
    console.error(err.message);
    res.status(500).send("Server error!");
  }
});
// ------------------------------------------------
// Verify user input for 'Login.js' page
// ------------------------------------------------
router.post("/login", verify, async (req, res) => {
  const { userName, password } = req.body; // Get all information from user input from 'Login.js' page

  try {
    const user = await pool.query(
      // Get all information matching 'username'
      "SELECT * FROM userData WHERE user_name = $1",
      [userName]
    );

    if (user.rows.length === 0) {
      // Send error if user does not exist
      return res.status(401).json("Invalid Username!");
    }
    const validPassword = await bcrypt.compare(
      // Compare password and encrypted password
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      // Send error if password is wrong
      return res.status(401).json("Invalid Password!");
    }
    const jwtToken = createJWT(user.rows[0].user_id); // Create new user JWT token

    return res.json({ jwtToken }); // Return token to client side
  } catch (err) {
    // Error occured
    console.error(err.message);
    res.status(500).send("Server error!");
  }
});

// ------------------------------------------------
// Edit user details for in 'ChangeUserDetails.js'
// ------------------------------------------------
router.post("/editaccount", auth, verifyNewUserEdit, async (req, res) => {
  const { fullName, email, oldPassword, newPassword } = req.body; // Get all information from user input from 'ChangeUserDetails.js' page

  try {
    const userPassword = await pool.query(
      // Get all information matching 'id' from JWT token
      "SELECT * FROM userData WHERE user_id = $1",
      [req.user.id]
    );

    const validPassword = await bcrypt.compare(
      // Compare password and encrypted password
      oldPassword,
      userPassword.rows[0].user_password
    );

    if (!validPassword) {
      // Return error if password does not match
      return res.status(401).json("Invalid Password!");
    }

    const salt = await bcrypt.genSalt(8); // Set up encryption
    const secretPassword = await bcrypt.hash(newPassword, salt); // Hide password

    const editUserAccount = await pool.query(
      // Update user details
      "UPDATE userData SET user_fullname =$1, user_password=$2,  user_email =$3 WHERE user_id =$4",
      [fullName, secretPassword, email, req.user.id]
    );
    const jwtToken = createJWT(userPassword.rows[0].user_id); // Create JWT token

    return res.json({ jwtToken }); // Return token to client side
  } catch (err) {
    // Error occured
    console.error(err.message);
  }
});
// ------------------------------------------------
// Verify user as they refresh page
// ------------------------------------------------
router.post("/verify", auth, (req, res) => {
  try {
    res.json(true); // Return 'true' if users JWT token is valid
  } catch (err) {
    // Error occured
    console.error(err.message);
    res.status(500).send("Server error!");
  }
});
// ---------------------------------------------------
// Get users data to display in 'ChangeUserDetails.js'
// ---------------------------------------------------
router.post("/editaccount2", auth, async (req, res) => {
  try {
    // Get user information to display in 'ChangeUserDetails.js'
    const user = await pool.query("SELECT * FROM userData WHERE user_id = $1", [
      req.user.id,
    ]);

    res.json(user.rows[0]); // Return user details
  } catch (err) {
    // Error occured
    console.error(err.message);
    res.status(500).send("Server error!");
  }
});
// ---------------------------------------------------
// Get top 10 user data to display in 'Leaderboard.js'
// ---------------------------------------------------
router.post("/leaderboard", auth, async (req, res) => {
  try {
    // Get top 10 in uncompleted favour owe's
    const user = await pool.query(
      "SELECT RANK() OVER (ORDER BY COUNT(recieving_username) DESC)AS Rank, recieving_username, COUNT(recieving_username) AS Favours FROM owefavour WHERE complete_image IS NULL GROUP BY recieving_username ORDER BY Favours DESC LIMIT 10"
    );

    res.json(user.rows); // Return leaderboard table
  } catch (err) {
    // Error occured
    console.error(err.message);
    res.status(500).send("Server error!");
  }
});

module.exports = router;
