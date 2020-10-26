/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/blob/master/server/middleware/validInfo.js
 *
 ***************************************************************************************************************/

module.exports = function (req, res, next) {
  const { fullName, email, password, userName } = req.body;
  // ------------------------------------------------
  // Verify user email
  // ------------------------------------------------
  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  // -----------------------------------------------------------------------
  // Verify if user has not left input empty for 'SignUp.js' and 'Login.js'
  // -----------------------------------------------------------------------
  if (req.path === "/signup") {
    if (![fullName].every(Boolean)) {
      return res.json("Missing Full Name!");
    } else if (![email].every(Boolean)) {
      return res.json("Missing Email!");
    } else if (![password].every(Boolean)) {
      return res.json("Missing Password!");
    } else if (![userName].every(Boolean)) {
      return res.json("Missing Username!");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email!");
    }
  } else if (req.path === "/login") {
    if (![userName].every(Boolean)) {
      return res.json("Missing Username!");
    } else if (![password].every(Boolean)) {
      return res.json("Missing Password!");
    }
  }

  next(); // Continue if no errors occur
};
