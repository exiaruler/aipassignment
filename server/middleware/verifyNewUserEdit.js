module.exports = function (req, res, next) {
  const { fullName, email, oldPassword, newPassword } = req.body;

  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  if (req.path === "/editaccount") {
    if (![fullName, email, oldPassword, newPassword].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }
  console.log("appl");
  next();
};
