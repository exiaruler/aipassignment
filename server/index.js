const express = require('express');
const app = express();
const cors=require("cors");
const pool=require("./db");
//middleware
app.use(cors());
app.use(express.json());

//routes

//owefavours
//add owefavour

app.post("/owefavour",async(req,res)=>{
try{
const {recievinguser}=req.body;
const {username}=req.params;
const {title}=req.body;
const {description}=req.body;
const {reward}=req.body;
const {image}=req.body;
const fillInComplete=false; 
//search up existing owed user 

const newOweFavour=await pool.query("INSERT INTO owefavour(title)VALUES($1)",
[username,title,description,reward,recievinguser,image,fillInComplete]);

res.json(newOweFavour);
}catch(err){
    console.error(err.message);
}
});


//get all owefavours
app.get("/owefavour",async(req,res)=>{
  try{
    const allOweFavours=await pool.query("SELECT title,favourdescription,rewards,recievingusername,complete,favourimage  from owefavour ;");
    res.json(allOweFavours.rows); 
  } catch(err){
    console.error(err.message);
  }
}
);

//get a owefavour
app.get("/owefavour/:title",async(req,res)=>{
 try{
   const {title}=req.params;
   const owefav=await pool.query("SELECT * FROM owefavour where title=$1",[title]);
   res.json(owefav.rows[0]);
 }catch(err){
  console.error(err.message);
 }
}
);

//update owefavour
app.get("/owefavour/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const {favourtitle}=req.body;
    const {description}=req.body;
    const {reward}=req.body;
    const {image}=req.body;
    const updateOweFavour= await pool.query("UPDATE owefavour SET title,favourdescription,reward,image =$1 WHERE favourID =$2",
      [id,favourtitle,description,reward,image]);
      res.json("favour updated");
  }catch(err){
    console.error(err.message);
  }
}
);


//delete owefavour
app.get("/owefavour/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    //create a querry that finds if the data contains an image
    const checkImage=await pool.query("SELECT favourimage FROM owefavour where userID=$1",[id]);
    if(checkImage.contains('null')){
    const deleteOweFavour= await pool.query("DELETE FROM owefavour WHERE favourID=$1",
      [id]);
      res.json("favour deleted");
    }
  }catch(err){
    console.error(err.message);
  }
}
);


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

  app.post("/signup", async (req, res) => { // lily
    console.log(req.body);// just for testing
  
    const { fullName, email, password, userName } = req.body;
    try {
      const user = await pool.query("SELECT * FROM userData WHERE user_name = $1", [
        userName
      ]);
  
      if (user.rows.length > 0) { 
        return res.status(401).json("User already exist!");
      }
  
  
      const newUser = await pool.query( 
        "INSERT INTO userData (user_fullname, user_email, user_password, user_name) VALUES ($1, $2, $3, $4) RETURNING *",
        [fullName, email, password, userName]
      );
  
      return res.json(newUser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  app.post("/login", async (req, res) => { // lily
    const { userName, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM userData WHERE user_name = $1", [
        userName
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }
  
      // need a password bycryt 
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  
    }
  });
  
  app.get("/editaccount", async (req, res) => { // lily
    console.log(req.body);// just for testing
    const {id}=req.params;
    const { fullName, email, userName, old_password, new_password } = req.body;
  
    // need old password to change details
    try {
      const password = await pool.query("SELECT * FROM userData WHERE user_password = $1", [
        old_password
      ]);
  
      if (password.rows.length === 0) {
        return res.status(401).json("Invalid Password"); // if old password matches with database
      }
        // if not null then update
      const editUserAccount = await pool.query("UPDATE userData SET user_fullname =$1, user_name=$3, user_password=$4,  user_email =$2 WHERE user_id =$5",
      [fullName, email, userName, new_password, id]);
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
    
  });
  

app.listen(5000,()=>{
    console.log("server has started on port 5000");
}
);

    //test post with postman
    //console.log(req.body);