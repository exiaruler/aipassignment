/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/blob/master/server/utils/jwtGenerator.js
 *
 ***************************************************************************************************************/
// ---------------------------------------------------
// Reference :  pern-jwt-tutorial
// ---------------------------------------------------
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ------------------------------------------------
// Create JWT token with user 'id'
// ------------------------------------------------
function createJWT(userID) {
  const payload = {
    user: {
      id: userID, // Place user 'id' within JWT token
    },
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 60 * 60 }); // Return and create JWT token that has a 1 hour session
}

module.exports = createJWT;
