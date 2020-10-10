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

module.exports = router;