/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/blob/master/server/middleware/validInfo.js
 *
 ***************************************************************************************************************/
// ---------------------------------------------------
// Reference :  pern-jwt-tutorial
// ---------------------------------------------------
module.exports = function (req, res, next) {
  const { fullName, email, oldPassword, newPassword } = req.body;
  // ------------------------------------------------
  // Verify user email
  // ------------------------------------------------
  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  // -------------------------------------------------------------------
  // Verify if user has not left input empty for 'ChangeUserDetails.js'
  // -------------------------------------------------------------------
  if (req.path === "/editaccount") {
    if (![fullName].every(Boolean)) {
      return res.status(401).json("Missing Full Name!");
    } else if (![email].every(Boolean)) {
      return res.status(401).json("Missing Email!");
    } else if (![oldPassword].every(Boolean)) {
      return res.status(401).json("Missing Old Password!");
    } else if (![newPassword].every(Boolean)) {
      return res.status(401).json("Missing New Password!");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email!");
    }
  }

  next(); // Continue if no errors occur
};
