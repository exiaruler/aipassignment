const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

////////////////////////////////////////////////// Sign up route
router.post("/signup", async (req, res) => {
  // lily
  console.log(req.body); // just for testing
  const role = "user";
  const { fullName, email, password, userName } = req.body;
  try {
    const user = await pool.query(
      "SELECT * FROM userData WHERE user_name = $1",
      [userName]
    );

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const newUser = await pool.query(
      "INSERT INTO userData (user_fullname, user_email, user_password, user_name, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [fullName, email, password, userName, role]
    );

    return res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
////////////////////////////////////////////////// Login route
router.post("/login", async (req, res) => {
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

    // need a password bycryt
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

////////////////////////////////////////////////// edit account route
router.get("/editaccount", async (req, res) => {
  // lily
  console.log(req.body); // just for testing
  //const { id } = req.params; // need to connect id with jwt token
  //console.log(id);
  const { fullName, email, userName, old_password, new_password } = req.body;

  // need old password to change details
  try {
    const password = await pool.query(
      "SELECT * FROM userData WHERE user_password = $1",
      [old_password]
    );

    if (password.rows.length === 0) {
      return res.status(401).json("Invalid Password"); // if old password matches with database
    }
    // if not null then update
    const editUserAccount = await pool.query(
      "UPDATE userData SET user_fullname =$1, user_name=$3, user_password=$4,  user_email =$2 WHERE user_id =$5",
      [fullName, email, userName, new_password, id]
    );
    res.json("Account was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
