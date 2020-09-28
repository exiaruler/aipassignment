const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const createJWT = require("../functions/createJWT");
const verify = require("../middleware/verify");
const verifyNewUserEdit = require("../middleware/verifyNewUserEdit");
const auth = require("../middleware/authoriseUser");

////////////////////////////////////////////////// Sign up route
router.post("/signup", verify, async (req, res) => {
  // lily
  console.log(req.body); // just for testing
  const role = "user";
  const { fullName, email, password, userName } = req.body;
  try {
    const existingUser = await pool.query(
      "SELECT * FROM userData WHERE user_name = $1",
      [userName]
    );

    if (existingUser.rows.length > 0) {
      // this is a table to see if the database has existing users 'id's'
      return res.status(401).json("User already exist!");
    }
    const salt = await bcrypt.genSalt(8); // how crypted the passwords is
    const secretPassword = await bcrypt.hash(password, salt); // hiding password

    const newUser = await pool.query(
      "INSERT INTO userData (user_fullname, user_email, user_password, user_name, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [fullName, email, secretPassword, userName, role]
    ); // add new user

    const jwtToken = createJWT(newUser.rows[0].user_id); // create token

    return res.json({ jwtToken }); // return token to client side
  } catch (err) {
    console.error(err.message); // error
    res.status(500).send("Server error");
  }
});
////////////////////////////////////////////////// Login route
router.post("/login", verify, async (req, res) => {
  // lily
  const { userName, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM userData WHERE user_name = $1",
      [userName]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = createJWT(user.rows[0].user_id);
    return res.json({ jwtToken });

    // need a password bycryt
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

////////////////////////////////////////////////// edit account route
router.post("/editaccount", auth, verifyNewUserEdit, async (req, res) => {
  // lily
  const { fullName, email, old_password, new_password } = req.body;

  // need old password to change details
  try {
    const userPassword = await pool.query(
      "SELECT * FROM userData WHERE user_id = $1",
      [req.user.id]
    );
    const validPassword = await bcrypt.compare(
      old_password,
      userPassword.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Password"); // if old password matches with database
    }

    const salt = await bcrypt.genSalt(8); // how crypted the passwords is
    const secretPassword = await bcrypt.hash(new_password, salt); // hiding password

    // if not null then update
    const editUserAccount = await pool.query(
      "UPDATE userData SET user_fullname =$1, user_password=$3,  user_email =$2 WHERE user_id =$4",
      [fullName, email, secretPassword, req.user.id]
    );
    res.json("Account was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
