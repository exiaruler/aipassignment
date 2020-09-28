module.exports = function (req, res, next) {
  const { fullName, email, userName, old_password, new_password } = req.body;

  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  if (req.path === "/editaccount") {
    if (![fullName, email, old_password, new_password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  }
  next();
};
