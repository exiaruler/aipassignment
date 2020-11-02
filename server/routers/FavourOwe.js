/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/tree/master/server/routes
 *
 ***************************************************************************************************************/
/***************************************************************************************************************
 *    Title: pern-todo-app
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-todo-app/tree/master/server
 *
 ***************************************************************************************************************/

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const fs = require("fs");
const multer = require("multer");
const verifyOwe = require("../middleware/verifyOweFavour");
const createJWT = require("../functions/createJWT"); 
const auth = require("../middleware/authoriseUser"); //jwt token for user access


//creates destination for image files and gives them a unique ID
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {

    cb(null, Date.now() + '.jpg')

  }
});


//init upload
const upload = multer({ storage: storage });

//OWEFAVOURS
//add owefavour with image-Samuel
router.post("/addowefavour", auth, upload.single("image"), async (req, res) => {
  try {
    var date = new Date();
    //input fields
    const { title, favourtype, description, reward, recievinguser } = req.body;
    const image = req.file.path;
    //get current date
    const favourDate =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

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
    console.log("favour type", favourtype, title);

    //check user if they exist from query
    if (checkUser.rows.length > 0) {
      //adds new favour
      const newOweFavour = await pool.query(
        "INSERT INTO owefavour(user_name,user_id,title,favour_type,favour_description,rewards,recieving_username,favour_image,favour_date,recieving_userid)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING * ",
        [
          username.rows[0].user_name,
          username.rows[0].user_id,
          title,
          favourtype,
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
//add favour containing no image field
router.post("/addowefavournoimage", auth, async (req, res) => {
  try {
    var date = new Date();
    //input fields
    const { title, description, reward, recievinguser, image } = req.body;
    //get current date
    const favourDate =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

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
      //add favour
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

//get all owefavours
//used for history of favours
router.get("/getallowefavour", auth, async (req, res) => {
  try {
    //get user from jwt token
    const username = await pool.query(
      "SELECT user_name FROM userData WHERE user_id = $1",
      [req.user.id]
    );
    //get all owe favours 
    const allOweFavours = await pool.query(
      "SELECT * from owefavour WHERE user_name=$1 ;",
      [username.rows[0].user_name]
    );
    res.json(allOweFavours.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all owed favours that are not complete
router.get("/getallliveowefavour", auth, async (req, res) => {
  try {
    //get user from jwt token 
    const username = await pool.query(
      "SELECT user_name FROM userData WHERE user_id = $1",
      [req.user.id]
    );

    const allOweFavours = await pool.query(
      "SELECT * from owefavour WHERE  complete_image IS NULL AND user_name=$1 ;",
      [username.rows[0].user_name]
    );

    res.json(allOweFavours.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//gets all owed favours from the user that are not compeleted
router.get("/getallowedfavour", auth, async (req, res) => {
  try {
    //get user from jwt token 
    const username = await pool.query(
      "SELECT user_name FROM userData WHERE user_id = $1",
      [req.user.id]
    );
    const allOweFavours = await pool.query(
      "SELECT * from owefavour WHERE complete_image IS NULL AND recieving_username=$1 ;",
      [username.rows[0].user_name]
    );

    res.json(allOweFavours.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get completed favours that the user has completed
router.get("/getcompleteowedfavour", auth, async (req, res) => {
  try {
    //get user from jwt token 
    const username = await pool.query(
      "SELECT user_name FROM userData WHERE user_id = $1",
      [req.user.id]
    );

    const complete = await pool.query(
      "SELECT * from owefavour WHERE complete_image IS NOT NULL AND recieving_username=$1 ;",
      [username.rows[0].user_name]
    );

    //const jwtToken = createJWT(userPassword.rows[0].user_id); // lily add, to verify the user on client side
    res.json(complete.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a owe favour by title
router.get("/getowefavour/:title", auth, async (req, res) => {
  try {
    //input field by title 
    const { title } = req.params;
    //get favour by title
    const owefav = await pool.query("SELECT * FROM owefavour where title=$1", [
      title,
    ]);
    res.json(owefav.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//get favour by id
router.get("/getowefavourid/:id", async (req, res) => {
  try {
    //input field by id
    const { id } = req.params;
    //get favour by ID
    const owefav = await pool.query(
      "SELECT * FROM owefavour where favour_id=$1",
      [id]
    );
    res.json(owefav.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update owefavour
// identifies favour by id
router.put("/updateowefavour/:id", async (req, res) => {
  try {
    //favour id parameter for updating favour  
    const { id } = req.params;
    //input fields
    const { title, description, reward } = req.body;
    //update favour
    const updateOweFavour = await pool.query(
      "UPDATE owefavour SET title=$2, favour_description=$3, rewards=$4 WHERE favour_ID =$1",
      [id, title, description, reward]
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
    console.log("user favour user " + "" + user.rows[0].user_name);
    console.log("user favour user " + "" + user.rows[0].recieving_username);
    const opposing = user.rows[0].recieving_username;

    //find opposing user
    const opposingUser = await pool.query(
      "SELECT * FROM owefavour where recieving_username=$1",
      [opposing]
    );
    console.log("opposing user favour " + "" + opposingUser.rows[0].user_name);
    console.log(
      "reciving user favour " + "" + opposingUser.rows[0].recieving_username
    );
    console.log(user.rows[0].user_name + "=" + opposingUser.rows[0].user_name);
    //    if(user.rows[0].user_name==opposingUser.rows[0].user_name){
    // if(opposingUser.rows[0].complete_image!=null){
    const deleteOweFavour = await pool.query(
      "DELETE FROM owefavour WHERE favour_id=$1",
      [id]
    );
    res.json("favour deleted");
    console.log("favour deleted");

  } catch (err) {
    console.error(err.message);
  }
});

//complete favour
router.put(
  "/completefavourowe/:id",
  auth,
  upload.single("completeImage"),
  async (req, res) => {
    try {
      //use favour id as parameter to complete favour 
      const { id } = req.params;
      //input field
      const completeImage = req.file.path;

      //update favour by adding image in complete image
      const updateOweFavour = await pool.query(
        "UPDATE owefavour SET complete_image =$1 WHERE favour_id =$2",
        [completeImage, id]
      );
      res.json("favour completed");
      console.log("favour complete");
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
