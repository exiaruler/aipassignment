const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const multer=require('multer');
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
router.post("/addowefavour",upload.single('image'),async(req,res)=>{
  try{
    //fields
  const {username,title,description,reward,recievinguser}=req.body;
  const image=req.file.path;
  
  //search up existing owed user 
  const checkUser = await pool.query("SELECT * FROM userData WHERE user_name=$1",
  [recievinguser]
  );
 
  //check user if they exist from query
  if(checkUser.rows.length>0){
  const newOweFavour=await pool.query("INSERT INTO owefavour(user_name,title,favour_description,rewards,recieving_username,favour_image)VALUES($1,$2,$3,$4,$5,$6) RETURNING * ",
  [username,title,description,reward,recievinguser,image]);
  console.log("owe favour added");
  res.json(newOweFavour);
  }else
  console.log("user recieving does not exist");
  }catch(err){
      console.error(err.message);
    }
  });
  
  //get all owefavours-Vivian
  router.get("/getallowefavour", async (req, res) => {
    try {
      const allOweFavours = await pool.query(
        "SELECT favour_id,title,favour_description,rewards,recieving_username,favour_image  from owefavour ;"
      );
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
      let checkImage = await pool.query(
        "SELECT favour_image FROM owefavour where favour_id=$1",
        [id]
      );
      
      //const test=JSON.parse(this.checkImage);
      console.log(checkImage.rows.favour_image);
     
      //checks if there a pathway 
      if (checkImage.rows!={favour_image: null}) {
        const deleteOweFavour = await pool.query(
          "DELETE FROM owefavour WHERE favour_id=$1",
          [id]
        );
        res.json("favour deleted");
     }
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