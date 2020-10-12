const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const fs = require("fs");
const multer = require("multer");
const createJWT = require("../functions/createJWT"); // lily
const auth = require("../middleware/authoriseUser"); //jwt token for user access
//creates destination for image files and gives them a unique ID
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//init upload
var upload = multer({ dest: "./uploads/" });

//OWEFAVOURS
//add owefavour with image-Samuel
router.post("/addowefavour", auth, upload.single("image"), async (req, res) => {
  try {
    var date= new Date;
    const { title, description, reward, recievinguser } = req.body;
    const image=req.file.path;
    //get current date 
    const favourDate=date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
 
    //use jwt token to get user
    const username = await pool.query(
      "SELECT * FROM userData WHERE user_id = $1",
      [req.user.id]
    );
    //search up existing owed user
    const checkUser = await pool.query(
      "SELECT * FROM userData WHERE user_name=$1",
      [recievinguser]
    );

    //check user if they exist from query
    if (checkUser.rows.length > 0) {
      const newOweFavour = await pool.query(
        "INSERT INTO owefavour(user_name,user_id,title,favour_description,rewards,recieving_username,favour_image,favour_date,recieving_userid)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ",
        [
          username.rows[0].user_name,
          username.rows[0].user_id,
          title,
          description,
          reward,
          recievinguser,
          image,
          favourDate,
          checkUser.rows[0].user_id,
        ]
      );
      console.log("owe favour added");
      res.json(newOweFavour);
    } else console.log("user recieving does not exist");
  } catch (err) {
    console.error(err.message);
  }
});
//add favour containing no image file upload
router.post("/addowefavournoimage", auth, async (req, res) => {
  try {
    var date= new Date;
    const { title, description, reward, recievinguser,image } = req.body;
    //get current date 
    const favourDate=date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
 
    //use jwt token to get user
    const username = await pool.query(
      "SELECT * FROM userData WHERE user_id = $1",
      [req.user.id]
    );
    //search up existing owed user
    const checkUser = await pool.query(
      "SELECT * FROM userData WHERE user_name=$1",
      [recievinguser]
    );

    //check user if they exist from query
    if (checkUser.rows.length > 0) {
      const newOweFavour = await pool.query(
        "INSERT INTO owefavour(user_name,user_id,title,favour_description,rewards,recieving_username,favour_image,favour_date,recieving_userid)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING * ",
        [
          username.rows[0].user_name,
          username.rows[0].user_id,
          title,
          description,
          reward,
          recievinguser,
          image,
          favourDate,
          checkUser.rows[0].user_id,
        ]
      );
      console.log("owe favour added");
      res.json(newOweFavour);
    } else console.log("user recieving does not exist");
  } catch (err) {
    console.error(err.message);
  }
});

//get all owefavours-Vivian
router.get("/getallowefavour", auth, async (req, res) => {
  try {
    const username = await pool.query(
      "SELECT user_name FROM userData WHERE user_id = $1",
      [req.user.id]
    );

    const allOweFavours = await pool.query(
      "SELECT favour_id,title,favour_description,rewards,recieving_username,favour_image from owefavour WHERE user_name=$1 ;",
      [username.rows[0].user_name]
    );
    const getImage = await pool.query(
      "SELECT favour_image from owefavour WHERE user_name=$1 ;",
      [username.rows[0].user_name]
    );
    //allOweFavours.rows[0].favour_image+".jpg";
    
    const jwtToken = createJWT(userPassword.rows[0].user_id); // lily add, to verify the user on client side
    res.json(allOweFavours.rows, { jwtToken });
  } catch (err) {
    console.error(err.message);
  }
});

//gets all owed favours from the user 
router.get("/getallowedfavour", auth, async (req, res) => {
  try {
    const username = await pool.query(
      "SELECT user_name FROM userData WHERE user_id = $1",
      [req.user.id]
    );

    const allOweFavours = await pool.query(
      "SELECT * from owefavour WHERE complete_image IS NULL AND recieving_username=$1 ;",
      [username.rows[0].user_name]
    );
  
    
    const jwtToken = createJWT(userPassword.rows[0].user_id); // lily add, to verify the user on client side
    res.json(allOweFavours.rows, { jwtToken });
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
    //Find if the owed user has a favour connection to the favour that is about to be deleted
    //find user 
    const user = await pool.query(
      "SELECT * FROM owefavour where favour_id=$1",
      [id]
    );
    console.log("user favour row "+ ""+user.rows );
    //find opposing user 
    const opposingUser = await pool.query(
      "SELECT * FROM owefavour where favour_id=$1",
      [user.rows[0].recieving_username]
    );
    console.log("opposing user favour row "+ ""+opposingUser.rows );
  //if(user.rows[0].user_name==opposingUser.rows[0].recieving_username)

    //checks if there a pathway in favour_image
    
      const deleteOweFavour = await pool.query(
        "DELETE FROM owefavour WHERE favour_id=$1",
        [id]
      );
      
      res.json("favour deleted");
  
      res.json("Cannot delete as image is present");
    
  } catch (err) {
    console.error(err.message);
  }
});

//complete favour
router.get("/completeFavourOwe/:id",upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { imageComplete } = req.file.path;
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
