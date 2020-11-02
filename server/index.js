/***************************************************************************************************************
 *    Title: chapter08_sql_raw
 *    Author: Benjamin Johnston
 *    Date: 2020
 *    Code version: 1.0
 *    Availability: https://github.com/benatuts/aipjs/blob/master/chapter08_sql_raw/index.js
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
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { query } = require("./db");
const querystring = require("querystring");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    //console.log("call",file.mimetype);
    cb(null, Date.now() + ".jpg");
  },
});

//init upload
const upload = multer({ storage: storage });

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./uploads"));
//routes
app.get("/", function (req, res) {
  res.sendFile(__basedir + "/react/index.html");
});

// ------------------------------------------------
// Create database table and initialize
// ------------------------------------------------
// Reference :  chapter08_sql_raw
// ------------------------------------------------
async function initialize() {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS owefavour (
      favour_ID SERIAL ,
      user_ID INT ,
      user_name VARCHAR(255) ,
      title VARCHAR(255) ,
      favour_type VARCHAR,
      favour_description VARCHAR(255) ,
      rewards VARCHAR(255) ,
      recieving_userID  INT ,
      recieving_username VARCHAR(255) ,
      favour_image VARCHAR,
      complete_image VARCHAR,
      favour_date VARCHAR,
        PRIMARY KEY (favour_ID),
      CONSTRAINT fk_user
      FOREIGN KEY (user_ID)
      REFERENCES userData(user_ID)
      )`
  );
  await pool.query(
    `CREATE TABLE IF NOT EXISTS favourRequest (
      favour_id SERIAL,
      user_ID INT,
      user_name VARCHAR(255),
      title VARCHAR(255),
      favour_description VARCHAR(255),
      rewards VARCHAR(255),
      favourrequest_date DATE,
      PRIMARY KEY (favour_id),
      FOREIGN KEY (user_ID)
      REFERENCES userData(user_ID)
    )`
  );
  await pool.query(
    `CREATE TABLE IF NOT EXISTS userData(
      user_ID SERIAL,
      user_fullName VARCHAR(255) not null,
      user_name VARCHAR(255) not null,
      user_password VARCHAR(255) not null,
      user_email VARCHAR(255) not null,
      user_role VARCHAR(255) not null,
      PRIMARY KEY (user_ID)
    )`
  );
}
// ------------------------------------------------
// User route to: 'Users.js'
// ------------------------------------------------
app.use("/auth", require("./routers/Users"));

// ------------------------------------------------
// Start serving and initialize
// ------------------------------------------------
initialize().then(() =>
  app.listen(5000, () => {
    console.log("server has started on port 5000");
  })
);

////////////////////////////////////////////////// owefavour route
app.use("/owe", require("./routers/FavourOwe"));

////////////////////////////////////////////////// favourrequest route
app.use("/request", require("./routers/FavourRequest"));


