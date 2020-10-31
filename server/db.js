const Pool=require("pg").Pool;

const pool=new Pool(
    {
        user:"reynad",
        password:"reynard28!",
        host:"localhost",
        port:5432,
        database:"aipassignmentdata"
    }
);

module.exports=pool;
