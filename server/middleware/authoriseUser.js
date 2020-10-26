/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/blob/master/server/middleware/authorize.js
 *
 ***************************************************************************************************************/
// ---------------------------------------------------
// Reference :  pern-jwt-tutorial
// ---------------------------------------------------
const JWT = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("JWTtoken"); // Get token from header

  // ------------------------------------------------
  // Check if token exist
  // ------------------------------------------------
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }
  // ------------------------------------------------
  // Verify token
  // ------------------------------------------------
  try {
    const verify = JWT.verify(token, process.env.jwtSecret);
    req.user = verify.user; // Set the user 'id'
    next(); // Continue if no errors occur
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" }); // Display error if token is not valid
  }
};
