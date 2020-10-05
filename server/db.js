const Pool=require("pg").Pool;

const pool=new Pool(
    {
        user:"newuser",
        password:"password",
        host:"localhost",
        port:5432,
        database:"aipassignmentdata"
    }
);

module.exports=pool;
