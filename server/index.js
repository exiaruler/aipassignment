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

app.listen(5000,()=>{
    console.log("server has started on port 5000");
}
);

    //test post with postman
    //console.log(req.body);