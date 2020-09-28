const jwt = require("jsonwebtoken");
require("dotenv").config();

function createJWT(userID) {
  const payload = {
    user: {
      id: userID,
    },
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 60 * 60 }); //one hour
}

module.exports = createJWT;
