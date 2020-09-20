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
    //test post with postman
    //console.log(req.body);

const{favourdescription}=req.body;
const newOweFavour=await pool.query("INSERT INTO owefavour(title)VALUES($1)",
[favourdescription]);

res.json(newOweFavour);
}catch(err){
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

app.listen(5000,()=>{
    console.log("server has started on port 5000");
}
);