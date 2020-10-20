module.exports = function (req, res, next) {
    const { title, favourtype, description, reward,recievinguser } = req.body;
   const image=req.file.path;
  
  
    if (req.path === "/addowefavour") {
      if (![title, favourtype, description, reward,recievinguser,image].every(Boolean)) {
        return res.json("Fields incomplete!");
      } 
    }
  
    next();
  };