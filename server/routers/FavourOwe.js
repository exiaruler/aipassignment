const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const fs = require('fs');
const multer=require('multer');
const auth = require("../middleware/authoriseUser"); //jwt token for user access 
//creates destination for image files and gives them a unique ID 
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//init upload
var upload = multer({ dest: './uploads/' })



//OWEFAVOURS
//add owefavour-Samuel
router.post("/addowefavour",auth,upload.single('image'),async(req,res)=>{
  try{
    //fields
    const {title,description,reward,recievinguser,image}=req.body;
    //const image=req.file.path;
    //use jwt token to get user
  const username = await pool.query(
    "SELECT * FROM userData WHERE user_id = $1",
    [req.user.id]
  );
  //search up existing owed user 
  const checkUser = await pool.query("SELECT * FROM userData WHERE user_name=$1",
  [recievinguser]
  );
 
  //check user if they exist from query
  if(checkUser.rows.length>0){
  const newOweFavour=await pool.query("INSERT INTO owefavour(user_name,user_id,title,favour_description,rewards,recieving_username,favour_image)VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * ",
  [username.rows[0].user_name,username.rows[0].user_id,title,description,reward,recievinguser,image]);
  console.log("owe favour added");
  res.json(newOweFavour);
  }else
  console.log("user recieving does not exist");
  }catch(err){
      console.error(err.message);
    }
  });
  
  //get all owefavours-Vivian
  router.get("/getallowefavour",auth,async (req, res) => {
    try {

      const username = await pool.query(
        "SELECT user_name FROM userData WHERE user_id = $1",
        [req.user.id]
      );
 
      const allOweFavours = await pool.query(
        "SELECT favour_id,title,favour_description,rewards,recieving_username,favour_image from owefavour WHERE user_name=$1 ;",[username.rows[0].user_name]
      );
      const getImage = await pool.query(
        "SELECT favour_image from owefavour WHERE user_name=$1 ;",[username.rows[0].user_name]
      );
   //allOweFavours.rows[0].favour_image+".jpg";
       // console.log(allOweFavours.rows[0].favour_image);
    
      res.json(allOweFavours.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  
  //get a owefavour-Vivian
  router.get("/getowefavour/:title", async (req, res) => {
    try {
      const { title } = req.params;
      const owefav = await pool.query("SELECT * FROM owefavour where title=$1", [
        title,
      ]);
      res.json(owefav.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //update owefavour-Vivian
  router.get("/updateOweFavour/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { favourtitle, description, reward, image } = req.body;
      const updateOweFavour = await pool.query(
        "UPDATE owefavour SET favour_id,title,favour_description,reward,favour_image =$1 WHERE favour_ID =$2",
        [id, favourtitle, description, reward, image]
      );
      res.json("favour updated");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete owefavour-Samuel
  router.delete("/deleteowefavour/:id", async (req, res) => {
    try {
      //parameter of deleting favour by id 
      const { id } = req.params;
      //create a querry that finds if the data contains an image
      const checkImage = await pool.query(
        "SELECT * FROM owefavour where favour_id=$1",
        [id]
      );
      
      //checks if there a pathway in favour_image
      if (checkImage.rows[0].favour_image==0) {
        const deleteOweFavour = await pool.query(
          "DELETE FROM owefavour WHERE favour_id=$1",
          [id]
        );
        res.json("favour deleted");
     }else
     {res.json("Cannot delete as image is present");}
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //complete favour
  router.get("/completeFavourOwe/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { imageComplete } = req.body;
      const updateOweFavour = await pool.query(
        "UPDATE owefavour SET complete_image =$1 WHERE favour_ID =$2",
        [id, imageComplete]
      );
      res.json("favour completed");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  
    module.exports = router;