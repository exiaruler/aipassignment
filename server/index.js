const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require('fs');
const multer=require('multer');
const path =require('path');
const { query } = require("./db");

//Storage engine 
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});


//init upload
var upload = multer({ dest: './uploads/' })

//middleware
app.use(cors());
app.use(express.json());
//routes

//OWEFAVOURS
//add owefavour-Samuel
app.post("/addowefavour",upload.single('image'),async(req,res)=>{
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
app.get("/getallowefavour", async (req, res) => {
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
app.get("/getowefavour/:title", async (req, res) => {
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
app.get("/updateOweFavour/:id", async (req, res) => {
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
app.delete("/deleteowefavour/:id", async (req, res) => {
  try {
    //parameter of deleting favour by id 
    const { id } = req.params;
    //create a querry that finds if the data contains an image
    const checkImage = await pool.query(
      "SELECT favour_image FROM owefavour where favour_id=$1",
      [id]
    );
    console.log(checkImage.rows);
    //checks if there a pathway 
    //if (checkImage.rows==null) {
      const deleteOweFavour = await pool.query(
        "DELETE FROM owefavour WHERE favour_id=$1",
        [id]
      );
      res.json("favour deleted");
   // }
  } catch (err) {
    console.error(err.message);
  }
});

//complete favour
app.get("/completeFavourOwe/:id", async (req, res) => {
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


//REQUESTFAVOURS
// add favourRequest
app.post("/addFavourRequest", async (req, res) => {
  try {
    const {username, title, favour_description, rewards, image} = req.body;
    const newFavourRequest = await pool.query(
      "INSERT INTO favourRequest(title, favour_description, rewards, image) VALUES($1, $2, $3, $4) RETURNING *",
      [title, favour_description, rewards, image]
      );
      res.json(newFavourRequest);
    //console.log("User completing does not exist");
  } catch (err) {
      console.error(err.message);
  }
});
// get ALL favourRequests
app.get("/getAllFavourRequests", async (req, res) => {
  try {
    const allFavourRequests = await pool.query(
      "SELECT title, favour_description, rewards, completing_Username,complete, favour_image FROM favourRequest;"
    );
    res.json(allFavourRequests.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// get A favourRequest
app.get("/getFavourRequest/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const favReq = await pool.query(
      "SELECT * FROM favourRequest WHERE title = $1",
      [title]
    );
    res.json(favReq.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// update favourRequest
app.put("/favourRequest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { favourtitle, description, reward, image } = req.body;
    const updateFavourRequest = await pool.query(
      "UPDATE favourRequest SET title, favour_description, reward, favour_image = $1 WHERE favour_ID =$2",
      [id, favourtitle, description, reward, image]
    );
    res.json("Favour updated");
  } catch (err) {
    console.error(err.message);
  }
});
// delete favourRequest
app.get("/deleteFavourRequest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Create query that finds if the data contains an image
    const checkImage = await pool.query(
      "SELECT favourimage FROM favourRequest where user_ID=$1",
      [id]
    );
    if (checkImage.contains("null")) {
      const deleteOweFavour = await pool.query(
        "DELETE FROM favourRequest WHERE favour_ID=$1",
        [id]
      );
      res.json("Favour deleted");
    }
  } catch (err) {
    console.error(err.message);
  }
});

//insert query to test your database connection using postman using sample table with no primary keys

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
////////////////////////////////////////////////// user route
app.use("/auth", require("./routers/Users")); //login, sign up, edit account

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

//test post with postman
//console.log(req.body);


// DB TESTING pls ignore - Rey
app.post("/practice", async (req, res) => {
  try {
    const {description} = req.body;
    const newPrac = await pool.query(
      "INSERT INTO prac (description) VALUES($1)",
      [description]
    );
    res.json(newPrac);    
  }
  catch (err) {
    console.error(err.message)
    }
});