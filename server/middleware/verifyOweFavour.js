/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/blob/master/server/middleware/validInfo.js
 *
 ***************************************************************************************************************/

module.exports = function (req, res, next) {
    const { title, favourtype, description, reward,recievinguser } = req.body;
   const image=req.file.path;
  
  /*
  Verify fields are fill in 
  */
    if (req.path === "/addowefavour") {
      if (![title, favourtype, description, reward,recievinguser,image].every(Boolean)) {
        //if any fields is empty 
        return res.json("Fields incomplete!");
      } 
    }
  
    next();
  };