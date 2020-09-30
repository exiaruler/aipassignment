module.exports = function (req, res, next) {
  const { fullName, email, password, userName } = req.body;

  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  if (req.path === "/signup") {
    if (![fullName, email, password, userName].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![userName, password].every(Boolean)) {
      return res.json("Missing Credentials");
    }
  }

  next();
};
